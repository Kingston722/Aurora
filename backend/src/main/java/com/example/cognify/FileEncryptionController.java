package com.example.cognify;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

@RestController
@RequestMapping("/file-security")
@CrossOrigin(origins = "*")
public class FileEncryptionController {

    private static final String SECRET_KEY = "ThisIsASecretKeyForAES256!!"; // 32-byte for AES-256

    @PostMapping("/encrypt")
    public String encryptFile(@RequestParam("file") MultipartFile file) {
        return processFile(file, true);
    }

    @PostMapping("/decrypt")
    public String decryptFile(@RequestParam("file") MultipartFile file) {
        return processFile(file, false);
    }

    private String processFile(MultipartFile file, boolean encrypt) {
        try {
            byte[] fileBytes = file.getBytes();
            String content = new String(fileBytes, StandardCharsets.UTF_8);
            String result;

            if (encrypt) {
                result = encryptAES(content);
                saveToFile("encrypted_" + file.getOriginalFilename(), result);
            } else {
                result = decryptAES(content);
                saveToFile("decrypted_" + file.getOriginalFilename(), result);
            }

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing file: " + e.getMessage();
        }
    }

    private String encryptAES(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKeySpec secretKey = getKey(SECRET_KEY);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    private String decryptAES(String data) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        SecretKeySpec secretKey = getKey(SECRET_KEY);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decoded = Base64.getDecoder().decode(data);
        return new String(cipher.doFinal(decoded), StandardCharsets.UTF_8);
    }

    private SecretKeySpec getKey(String myKey) throws Exception {
        byte[] key = myKey.getBytes(StandardCharsets.UTF_8);
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        key = sha.digest(key);
        key = Arrays.copyOf(key, 32); // use 256-bit key
        return new SecretKeySpec(key, "AES");
    }

    private void saveToFile(String fileName, String content) throws Exception {
        File file = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(content.getBytes(StandardCharsets.UTF_8));
        }
    }
}
