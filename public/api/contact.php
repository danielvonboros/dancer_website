<?php
/**
 * Contact form handler for denisonsilva.com (all-inkl, PHP 8).
 *
 * Takes the JSON the React form posts, checks it, and mails it to Denison.
 * Nothing is written to disk and nothing leaves this server except the
 * email itself — which is exactly what the privacy page promises.
 *
 * Vite copies this file from public/api/ into dist/api/, so it deploys
 * together with the site. Test it with the curl commands in the README.
 */

declare(strict_types=1);

// Where messages go, and the address they are sent from. The sender must
// be a mailbox on this domain: a "From" on someone else's domain fails
// SPF and lands in spam. The visitor's address goes into Reply-To, so
// pressing "reply" still answers them.
const MAIL_TO   = 'contact@denisonsilva.com';
const MAIL_FROM = 'contact@denisonsilva.com';

// Only the site itself may post here. Browsers always send an Origin
// header with a POST, so this cheaply turns away forms on other sites.
const ALLOWED_ORIGINS = [
    'https://denisonsilva.com',
    'https://www.denisonsilva.com',
];

const MAX_BODY_BYTES = 20_000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function respond(int $status, bool $ok, string $error = ''): never
{
    http_response_code($status);
    echo json_encode($error === '' ? ['ok' => $ok] : ['ok' => $ok, 'error' => $error]);
    exit;
}

/**
 * Trim, cap the length and — for anything that ends up in a mail header —
 * remove line breaks. A line break is how header injection gets in.
 */
function field(array $data, string $key, int $max, bool $singleLine = true): string
{
    $value = trim((string) ($data[$key] ?? ''));
    if ($singleLine) {
        $value = str_replace(["\r", "\n"], ' ', $value);
    }
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'method_not_allowed');
}

if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', ALLOWED_ORIGINS, true)) {
    respond(403, false, 'origin_not_allowed');
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, false, 'too_large');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, false, 'invalid_json');
}

// Honeypot: invisible to people, irresistible to bots. Answer "sent" so
// the bot moves on instead of retrying with a different payload.
if (field($data, 'company', 200) !== '') {
    respond(200, true);
}

$name    = field($data, 'name', 120);
$email   = field($data, 'email', 254);
$subject = field($data, 'subject', 120);
$message = field($data, 'message', 5000, singleLine: false);

if ($name === '' || $message === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, false, 'invalid_fields');
}

$body = implode("\n", [
    "Name:   {$name}",
    "Email:  {$email}",
    "Topic:  {$subject}",
    '',
    $message,
    '',
    '-- ',
    'Sent from the contact form on denisonsilva.com',
]);

$headers = [
    'From'                      => 'denisonsilva.com <' . MAIL_FROM . '>',
    'Reply-To'                  => $email, // FILTER_VALIDATE_EMAIL rejects line breaks
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$sent = mail(
    MAIL_TO,
    mb_encode_mimeheader("Website: {$subject} ({$name})", 'UTF-8'),
    $body,
    $headers,
);

respond($sent ? 200 : 500, $sent, $sent ? '' : 'mail_failed');
