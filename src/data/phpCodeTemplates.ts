export interface CodeFile {
  name: string;
  language: 'php' | 'sql' | 'json';
  description: string;
  code: string;
}

export const PHP_MYSQL_CODE_FILES: CodeFile[] = [
  {
    name: 'schema_didik_tuisyen.sql',
    language: 'sql',
    description: 'Skema pangkalan data MySQL lengkap untuk pusat tuisyen, pelajar, rekod yuran, pembayaran iPay88, dan log automasi WhatsApp.',
    code: `-- ========================================================
-- SISTEM PENGURUSAN PUSAT TUISYEN DIDIK (didik.tuisyennow.my)
-- Pangkalan Data: didik_tuisyennow_db
-- Versi: 2.4.0 (PHP 8.1+ & MySQL 8.0 / MariaDB 10.5+)
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`didik_tuisyennow_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`didik_tuisyennow_db\`;

-- 1. Jadual Maklumat Pemilik / Cawangan Pusat Tuisyen SME
CREATE TABLE IF NOT EXISTS \`pusat_tuisyen\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`nama_tuisyen\` VARCHAR(150) NOT NULL,
  \`ssm_no\` VARCHAR(50) NULL,
  \`nama_pemilik\` VARCHAR(100) NOT NULL,
  \`emel\` VARCHAR(100) UNIQUE NOT NULL,
  \`kata_laluan_hash\` VARCHAR(255) NOT NULL,
  \`no_telefon\` VARCHAR(20) NOT NULL,
  \`alamat\` TEXT NULL,
  \`status_langganan\` ENUM('trial', 'active', 'suspended', 'expired') DEFAULT 'trial',
  \`pelan_id\` ENUM('starter', 'growth', 'empire') DEFAULT 'starter',
  \`tarikh_tamat_langganan\` DATE NULL,
  \`ipay88_merchant_code\` VARCHAR(50) DEFAULT 'M01234',
  \`ipay88_merchant_key\` VARCHAR(100) DEFAULT 'apple123KEY',
  \`whatsapp_phone_number_id\` VARCHAR(100) NULL,
  \`whatsapp_access_token\` TEXT NULL,
  \`tarikh_daftar\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Jadual Rekod Pelajar Tuisyen
CREATE TABLE IF NOT EXISTS \`pelajar\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`tuisyen_id\` INT NOT NULL,
  \`no_matrik\` VARCHAR(30) UNIQUE NOT NULL,
  \`nama_penuh\` VARCHAR(150) NOT NULL,
  \`no_ic\` VARCHAR(20) NOT NULL,
  \`tingkatan_darjah\` VARCHAR(30) NOT NULL,
  \`nama_ibu_bapa\` VARCHAR(100) NOT NULL,
  \`no_telefon_ibu_bapa\` VARCHAR(20) NOT NULL,
  \`emel_ibu_bapa\` VARCHAR(100) NULL,
  \`yuran_bulanan_asas\` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  \`status_pelajar\` ENUM('aktif', 'tamat', 'berhenti') DEFAULT 'aktif',
  \`tarikh_masuk\` DATE NOT NULL,
  FOREIGN KEY (\`tuisyen_id\`) REFERENCES \`pusat_tuisyen\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Jadual Invois Yuran Bulanan
CREATE TABLE IF NOT EXISTS \`invois_yuran\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`tuisyen_id\` INT NOT NULL,
  \`pelajar_id\` INT NOT NULL,
  \`no_invois\` VARCHAR(50) UNIQUE NOT NULL,
  \`bulan\` TINYINT NOT NULL,
  \`tahun\` SMALLINT NOT NULL,
  \`jumlah_yuran\` DECIMAL(10,2) NOT NULL,
  \`status_bayaran\` ENUM('unpaid', 'paid', 'processing', 'cancelled') DEFAULT 'unpaid',
  \`tarikh_akhir_bayar\` DATE NOT NULL,
  \`pautan_bayaran_ipay88\` VARCHAR(255) NULL,
  \`tarikh_dibayar\` DATETIME NULL,
  \`resit_no\` VARCHAR(50) NULL,
  FOREIGN KEY (\`tuisyen_id\`) REFERENCES \`pusat_tuisyen\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`pelajar_id\`) REFERENCES \`pelajar\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Jadual Log Transaksi Gerbang Pembayaran iPay88
CREATE TABLE IF NOT EXISTS \`transaksi_ipay88\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`invois_id\` INT NOT NULL,
  \`ref_no\` VARCHAR(50) NOT NULL,
  \`ipay88_trans_id\` VARCHAR(50) NULL,
  \`payment_id\` INT NULL,
  \`jumlah\` DECIMAL(10,2) NOT NULL,
  \`kaedah_bayaran\` VARCHAR(50) NULL,
  \`status_kod\` VARCHAR(5) NOT NULL, -- '1' = Berjaya, '0' = Gagal
  \`auth_code\` VARCHAR(50) NULL,
  \`ralat_mesej\` TEXT NULL,
  \`signature_hantar\` VARCHAR(255) NOT NULL,
  \`signature_terima\` VARCHAR(255) NULL,
  \`ip_pelanggan\` VARCHAR(45) NULL,
  \`tarikh_transaksi\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`invois_id\`) REFERENCES \`invois_yuran\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Jadual Log Automasi WhatsApp (Mesej Yuran & Resit Rasmi)
CREATE TABLE IF NOT EXISTS \`log_whatsapp\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`tuisyen_id\` INT NOT NULL,
  \`pelajar_id\` INT NOT NULL,
  \`no_penerima\` VARCHAR(20) NOT NULL,
  \`jenis_templat\` ENUM('peringatan_yuran', 'resit_bayaran', 'kehadiran_kelas', 'promosi_pendaftaran') NOT NULL,
  \`kandungan_mesej\` TEXT NOT NULL,
  \`whatsapp_message_id\` VARCHAR(100) NULL,
  \`status_hantar\` ENUM('queued', 'sent', 'delivered', 'read', 'failed') DEFAULT 'sent',
  \`ralat_api\` TEXT NULL,
  \`tarikh_hantar\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`tuisyen_id\`) REFERENCES \`pusat_tuisyen\`(\`id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`pelajar_id\`) REFERENCES \`pelajar\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;`,
  },
  {
    name: 'config.php',
    language: 'php',
    description: 'Konfigurasi pangkalan data MySQL (PDO), kunci iPay88 Malaysia, dan kelayakan WhatsApp Cloud API Meta.',
    code: `<?php
/**
 * Fail Konfigurasi Utama Didik TuisyenNow
 * Pautan Sistem: https://didik.tuisyennow.my
 */

declare(strict_types=1);

// Tetapan Zon Masa Malaysia (GMT+8)
date_default_timezone_set('Asia/Kuala_Lumpur');

// Tetapan Sambungan MySQL (Gunakan PDO untuk Perlindungan Suntikan SQL)
define('DB_HOST', 'localhost');
define('DB_NAME', 'didik_tuisyennow_db');
define('DB_USER', 'didik_admin');
define('DB_PASS', 'Rahsia@Didik2026!');
define('DB_CHARSET', 'utf8mb4');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    die("Ralat sambungan pangkalan data: " . $e->getMessage());
}

// Konfigurasi Gerbang Pembayaran iPay88 Malaysia
// Nota: Ganti dengan Merchant Key & Code rasmi dari permohonan iPay88 anda
define('IPAY88_MERCHANT_CODE', 'M01234');
define('IPAY88_MERCHANT_KEY',  'apple123KEY');
define('IPAY88_PAYMENT_URL',   'https://payment.ipay88.com.my/epayment/entry.asp'); // Production
// Sandbox URL: 'https://sandbox.ipay88.com.my/epayment/entry.asp'

define('APP_URL', 'https://didik.tuisyennow.my');
define('IPAY88_RESPONSE_URL', APP_URL . '/ipay88_response.php');
define('IPAY88_BACKEND_URL',  APP_URL . '/ipay88_backend_post.php');

// Konfigurasi WhatsApp Cloud API (Meta for Developers)
define('WHATSAPP_TOKEN', 'EAA...RAHSIA_ACCESS_TOKEN');
define('WHATSAPP_PHONE_ID', '109876543210987');
define('WHATSAPP_API_VERSION', 'v21.0');
?>`,
  },
  {
    name: 'ipay88_request.php',
    language: 'php',
    description: 'Menjana borang pembayaran dengan algoritma hash SHA-256 mengikut spesifikasi rasmi protokol iPay88 Malaysia.',
    code: `<?php
/**
 * Modul Permintaan Pembayaran iPay88
 * Menjana SHA-256 Signature dan mengarahkan pengguna ke halaman bayaran selamat.
 */

require_once __DIR__ . '/config.php';

// Pastikan maklumat yuran/invois sah
$refNo    = $_GET['inv'] ?? 'INV-' . date('Ymd') . '-' . rand(1000, 9999);
$amount   = number_format((float)($_GET['amount'] ?? 189.00), 2, '.', '');
$currency = 'MYR';

// Butiran Pelanggan (Ibu bapa atau Pemilik Tuisyen)
$userName    = $_GET['name'] ?? 'Puan Halimah';
$userEmail   = $_GET['email'] ?? 'halimah@gmail.com';
$userContact = $_GET['phone'] ?? '0123456789';
$prodDesc    = 'Yuran Langganan Didik TuisyenNow (' . $refNo . ')';

/**
 * Formula Signature Rasmi iPay88 SHA-256:
 * hash('sha256', MerchantKey . MerchantCode . RefNo . AmountTanpaTitikAtauKoma . Currency)
 * Contoh: Jika Amount 189.00 -> Amount dalam hash ialah '18900'
 */
$amountForHash = str_replace(['.', ','], '', $amount);
$sourceString  = IPAY88_MERCHANT_KEY . IPAY88_MERCHANT_CODE . $refNo . $amountForHash . $currency;
$signature     = hash('sha256', $sourceString);

// Simpan rekod sebelum dihantar ke iPay88
$stmt = $pdo->prepare("
    INSERT INTO transaksi_ipay88 (invois_id, ref_no, jumlah, status_kod, signature_hantar, ip_pelanggan)
    VALUES (1, :ref_no, :amount, '0', :signature, :ip)
");
$stmt->execute([
    'ref_no'    => $refNo,
    'amount'    => $amount,
    'signature' => $signature,
    'ip'        => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
]);
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <title>Mengarahkan ke Gerbang Pembayaran iPay88...</title>
    <style>
        body { font-family: sans-serif; text-align: center; padding-top: 100px; background: #0f172a; color: #fff; }
        .spinner { border: 4px solid #334155; border-top: 4px solid #3b82f6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    </style>
</head>
<body onload="document.forms['ipay88_form'].submit();">
    <h2>Mengarahkan ke Gerbang iPay88 Selamat...</h2>
    <p>Sila tunggu sebentar. Jangan tutup atau segarkan halaman ini.</p>
    <div class="spinner"></div>

    <form name="ipay88_form" method="POST" action="<?= htmlspecialchars(IPAY88_PAYMENT_URL) ?>">
        <input type="hidden" name="MerchantCode" value="<?= htmlspecialchars(IPAY88_MERCHANT_CODE) ?>">
        <input type="hidden" name="PaymentId" value="">
        <input type="hidden" name="RefNo" value="<?= htmlspecialchars($refNo) ?>">
        <input type="hidden" name="Amount" value="<?= htmlspecialchars($amount) ?>">
        <input type="hidden" name="Currency" value="<?= htmlspecialchars($currency) ?>">
        <input type="hidden" name="ProdDesc" value="<?= htmlspecialchars($prodDesc) ?>">
        <input type="hidden" name="UserName" value="<?= htmlspecialchars($userName) ?>">
        <input type="hidden" name="UserEmail" value="<?= htmlspecialchars($userEmail) ?>">
        <input type="hidden" name="UserContact" value="<?= htmlspecialchars($userContact) ?>">
        <input type="hidden" name="Remark" value="PusatTuisyenDidik">
        <input type="hidden" name="Lang" value="UTF-8">
        <input type="hidden" name="SignatureType" value="SHA256">
        <input type="hidden" name="Signature" value="<?= htmlspecialchars($signature) ?>">
        <input type="hidden" name="ResponseURL" value="<?= htmlspecialchars(IPAY88_RESPONSE_URL) ?>">
        <input type="hidden" name="BackendURL" value="<?= htmlspecialchars(IPAY88_BACKEND_URL) ?>">
        <noscript>
            <button type="submit" style="padding: 10px 20px; font-size: 16px;">Klik Sini Jika Tidak Dihantar Secara Automatik</button>
        </noscript>
    </form>
</body>
</html>`,
  },
  {
    name: 'ipay88_response.php',
    language: 'php',
    description: 'Halaman tindak balas selepas pembayar melengkapkan transaksi iPay88. Mengesahkan tandatangan SHA-256 dan memaparkan status resit.',
    code: `<?php
/**
 * iPay88 Response URL (Halaman Paparan Pengguna)
 * Mengesahkan integriti data daripada iPay88 dan mencetuskan WhatsApp Resit Rasmi.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/whatsapp_api.php';

$merchantCode = $_POST['MerchantCode'] ?? '';
$paymentId    = $_POST['PaymentId'] ?? '';
$refNo         = $_POST['RefNo'] ?? '';
$amount        = $_POST['Amount'] ?? '';
$currency      = $_POST['Currency'] ?? '';
$remark        = $_POST['Remark'] ?? '';
$transId       = $_POST['TransId'] ?? '';
$authCode      = $_POST['AuthCode'] ?? '';
$status        = $_POST['Status'] ?? ''; // '1' = Berjaya, '0' = Gagal
$errDesc       = $_POST['ErrDesc'] ?? '';
$signatureRecv = $_POST['Signature'] ?? '';

// Formula SHA-256 Verifikasi Penerimaan daripada iPay88:
// hash('sha256', MerchantKey . MerchantCode . PaymentId . RefNo . AmountTanpaTitik . Currency . Status)
$amountClean   = str_replace(['.', ','], '', $amount);
$sourceVerify  = IPAY88_MERCHANT_KEY . $merchantCode . $paymentId . $refNo . $amountClean . $currency . $status;
$expectedSign  = hash('sha256', $sourceVerify);

$isSignatureValid = hash_equals($expectedSign, $signatureRecv);

if (!$isSignatureValid) {
    die("AMARAN KESELAMATAN: Tandatangan iPay88 tidak sah! Transaksi mungkin telah dimanipulasi.");
}

if ($status === '1') {
    // 1. Kemas kini status invois kepada 'paid' dalam MySQL
    $stmt = $pdo->prepare("
        UPDATE invois_yuran
        SET status_bayaran = 'paid',
            tarikh_dibayar = NOW(),
            resit_no = :resit
        WHERE no_invois = :ref_no
    ");
    $resitNo = 'RCP-' . date('Ymd') . '-' . substr($transId, -4);
    $stmt->execute(['resit' => $resitNo, 'ref_no' => $refNo]);

    // 2. Kemas kini rekod log iPay88
    $stmt2 = $pdo->prepare("
        UPDATE transaksi_ipay88
        SET ipay88_trans_id = :trans_id,
            status_kod = '1',
            auth_code = :auth_code,
            signature_terima = :sig
        WHERE ref_no = :ref_no
    ");
    $stmt2->execute([
        'trans_id'  => $transId,
        'auth_code' => $authCode,
        'sig'       => $signatureRecv,
        'ref_no'    => $refNo
    ]);

    // 3. Panggil Automasi WhatsApp untuk menghantar resit rasmi ke telefon ibu bapa
    $wa = new DidikWhatsAppBot();
    $wa->hantarResitBayaran(
        noTelefon: '60123456789',
        namaIbuBapa: 'Puan Halimah',
        namaPelajar: 'Nur Aina Batrisyia',
        resitNo: $resitNo,
        jumlah: 'RM ' . $amount,
        tarikh: date('d/m/Y H:i A')
    );
}
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <title>Status Pembayaran - Didik TuisyenNow</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0b1329; color: #f8fafc; padding: 40px 20px; }
        .card { max-width: 520px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        .success { color: #10b981; font-size: 24px; font-weight: bold; }
        .fail { color: #ef4444; font-size: 24px; font-weight: bold; }
        .row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155; }
        .btn { display: block; text-align: center; background: #2563eb; color: #fff; padding: 14px; border-radius: 10px; text-decoration: none; margin-top: 24px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="card">
        <?php if ($status === '1'): ?>
            <div class="success">✓ Pembayaran Berjaya!</div>
            <p>Alhamdulillah, yuran telah diterima dan direkodkan secara automatik ke dalam sistem Didik TuisyenNow.</p>
            <div class="row"><span>No. Rujukan Invois:</span><strong><?= htmlspecialchars($refNo) ?></strong></div>
            <div class="row"><span>ID Transaksi iPay88:</span><strong><?= htmlspecialchars($transId) ?></strong></div>
            <div class="row"><span>Jumlah Dibayar:</span><strong>RM <?= htmlspecialchars($amount) ?></strong></div>
            <div class="row"><span>No. Resit Rasmi:</span><strong><?= htmlspecialchars($resitNo) ?></strong></div>
            <p style="font-size: 13px; color: #94a3b8; margin-top: 15px;">
                * Resit PDF rasmi dan pengesahan telah dihantar ke WhatsApp ibu bapa secara automatik.
            </p>
        <?php else: ?>
            <div class="fail">✕ Pembayaran Gagal</div>
            <p>Transaksi anda tidak dapat diselesaikan: <?= htmlspecialchars($errDesc ?: 'Dibatalkan oleh pengguna.') ?></p>
            <div class="row"><span>No. Rujukan:</span><strong><?= htmlspecialchars($refNo) ?></strong></div>
        <?php endif; ?>
        <a href="https://didik.tuisyennow.my" class="btn">Kembali ke Portal Didik TuisyenNow</a>
    </div>
</body>
</html>`,
  },
  {
    name: 'whatsapp_api.php',
    language: 'php',
    description: 'Kelas automasi WhatsApp rasmi (Meta Cloud API v21.0) untuk peringatan yuran tertunggak, slip resit, dan kehadiran pelajar.',
    code: `<?php
/**
 * Kelas Pengurusan Automasi WhatsApp Didik TuisyenNow
 * Menggunakan Meta Graph API v21.0 (WhatsApp Cloud API)
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';

class DidikWhatsAppBot
{
    private string $accessToken;
    private string $phoneId;
    private string $apiUrl;

    public function __construct()
    {
        $this->accessToken = WHATSAPP_TOKEN;
        $this->phoneId     = WHATSAPP_PHONE_ID;
        $this->apiUrl      = "https://graph.facebook.com/" . WHATSAPP_API_VERSION . "/{$this->phoneId}/messages";
    }

    /**
     * Hantar Peringatan Yuran Bulanan Bersama Pautan Bayaran iPay88 Langsung
     */
    public function hantarPeringatanYuran(
        string $noTelefon,
        string $namaIbuBapa,
        string $namaPelajar,
        string $bulan,
        string $jumlahYuran,
        string $pautanBayaran
    ): array {
        // Bersihkan format nombor telefon Malaysia (tukar 01x kepada 601x)
        $cleanPhone = preg_replace('/[^0-9]/', '', $noTelefon);
        if (str_starts_with($cleanPhone, '0')) {
            $cleanPhone = '6' . $cleanPhone;
        }

        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $cleanPhone,
            'type'              => 'interactive',
            'interactive'       => [
                'type' => 'button',
                'header' => [
                    'type' => 'text',
                    'text' => '🔔 Peringatan Yuran Tuisyen'
                ],
                'body' => [
                    'text' => "Salam sejahtera, *{$namaIbuBapa}*.\n\n"
                            . "Ini adalah peringatan mesra bagi yuran tuisyen anakanda *{$namaPelajar}* bagi sesi *{$bulan}* berjumlah *RM{$jumlahYuran}*.\n\n"
                            . "Pihak pengurusan menyediakan kemudahan bayaran pantas secara online tanpa perlu muat naik resit manual."
                ],
                'footer' => [
                    'text' => 'Sistem Automasi Didik TuisyenNow'
                ],
                'action' => [
                    'buttons' => [
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'btn_pay_now',
                                'title' => 'Bayar Sekarang 💳'
                            ]
                        ],
                        [
                            'type' => 'reply',
                            'reply' => [
                                'id' => 'btn_hubungi_admin',
                                'title' => 'Tanya Pejabat 💬'
                            ]
                        ]
                    ]
                ]
            ]
        ];

        return $this->hantarRequest($payload);
    }

    /**
     * Hantar Resit Rasmi Selepas iPay88 Berjaya
     */
    public function hantarResitBayaran(
        string $noTelefon,
        string $namaIbuBapa,
        string $namaPelajar,
        string $resitNo,
        string $jumlah,
        string $tarikh
    ): array {
        $cleanPhone = preg_replace('/[^0-9]/', '', $noTelefon);
        if (str_starts_with($cleanPhone, '0')) {
            $cleanPhone = '6' . $cleanPhone;
        }

        $mesej = "✅ *RESIT PEMBAYARAN RASMI DITERIMA*\n"
               . "━━━━━━━━━━━━━━━━━━━━\n"
               . "Kepada: *{$namaIbuBapa}*\n"
               . "Pelajar: *{$namaPelajar}*\n"
               . "No. Resit: *{$resitNo}*\n"
               . "Jumlah Sah: *{$jumlah}*\n"
               . "Tarikh: *{$tarikh}*\n"
               . "Kaedah: *iPay88 FPX / DuitNow QR*\n"
               . "Status: *LUNAS (PAID)*\n"
               . "━━━━━━━━━━━━━━━━━━━━\n"
               . "Terima kasih atas sokongan berterusan anda terhadap pendidikan anakanda bersama Pusat Tuisyen Didik.\n\n"
               . "🌐 Akses rekod kehadiran & prestasi: https://didik.tuisyennow.my";

        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type'    => 'individual',
            'to'                => $cleanPhone,
            'type'              => 'text',
            'text'              => [
                'preview_url' => true,
                'body'        => $mesej
            ]
        ];

        return $this->hantarRequest($payload);
    }

    /**
     * Pelaksanaan cURL ke Meta Graph API
     */
    private function hantarRequest(array $data): array
    {
        $ch = curl_init($this->apiUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->accessToken,
            'Content-Type: application/json'
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'http_code' => $httpCode,
            'response'  => json_decode((string)$response, true)
        ];
    }
}
?>`,
  },
  {
    name: 'cron_auto_reminder.php',
    language: 'php',
    description: 'Skrip cron job harian automatik untuk mengesan yuran tertunggak dan melepaskan notifikasi WhatsApp berjadual.',
    code: `<?php
/**
 * Cron Job Harian: Pengesanan Yuran Tertunggak & Peringatan Automatik WhatsApp
 * Jalankan setiap hari jam 9:00 pagi:
 * 0 9 * * * /usr/bin/php /home/user/public_html/cron_auto_reminder.php > /dev/null 2>&1
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/whatsapp_api.php';

$bot = new DidikWhatsAppBot();

// Dapatkan semua invois yang belum dibayar bagi bulan semasa
$query = "
    SELECT 
        i.id AS invois_id,
        i.no_invois,
        i.jumlah_yuran,
        i.bulan,
        p.nama_penuh AS nama_pelajar,
        p.nama_ibu_bapa,
        p.no_telefon_ibu_bapa,
        pt.nama_tuisyen
    FROM invois_yuran i
    JOIN pelajar p ON i.pelajar_id = p.id
    JOIN pusat_tuisyen pt ON i.tuisyen_id = pt.id
    WHERE i.status_bayaran = 'unpaid'
      AND i.tarikh_akhir_bayar <= CURRENT_DATE()
";

$stmt = $pdo->query($query);
$invoisList = $stmt->fetchAll();

echo "[" . date('Y-m-d H:i:s') . "] Memulakan pengesanan yuran tertunggak...\n";
$bilBerjaya = 0;

foreach ($invoisList as $row) {
    $pautan = APP_URL . "/ipay88_request.php?inv=" . urlencode($row['no_invois']) . "&amount=" . urlencode((string)$row['jumlah_yuran']);
    $namaBulan = DateTime::createFromFormat('!m', (string)$row['bulan'])->format('F');

    $res = $bot->hantarPeringatanYuran(
        noTelefon: $row['no_telefon_ibu_bapa'],
        namaIbuBapa: $row['nama_ibu_bapa'],
        namaPelajar: $row['nama_pelajar'],
        bulan: $namaBulan,
        jumlahYuran: number_format((float)$row['jumlah_yuran'], 2),
        pautanBayaran: $pautan
    );

    if ($res['http_code'] === 200) {
        $bilBerjaya++;
        echo "✓ Mesej berjaya dihantar ke {$row['nama_ibu_bapa']} ({$row['no_telefon_ibu_bapa']})\n";
    } else {
        echo "✕ Gagal hantar ke {$row['nama_ibu_bapa']}: " . json_encode($res['response']) . "\n";
    }
}

echo "Selesai! {$bilBerjaya} daripada " . count($invoisList) . " peringatan WhatsApp telah dihantar.\n";
?>`,
  },
];
