package com.example.cognify;

import org.springframework.web.bind.annotation.*;
import java.security.SecureRandom;

@RestController
@RequestMapping("/password")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordController {

    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

    @PostMapping("/generate")
    public PasswordResponse generatePassword(@RequestBody PasswordRequest request) {
        StringBuilder allowedChars = new StringBuilder();
        SecureRandom random = new SecureRandom();
        
        if (request.isIncludeLowercase()) allowedChars.append(LOWERCASE);
        if (request.isIncludeUppercase()) allowedChars.append(UPPERCASE);
        if (request.isIncludeNumbers()) allowedChars.append(NUMBERS);
        if (request.isIncludeSpecial()) allowedChars.append(SPECIAL_CHARACTERS);

        if (allowedChars.length() == 0) {
            throw new IllegalArgumentException("At least one character type must be selected.");
        }

        StringBuilder password = new StringBuilder();
        for (int i = 0; i < request.getLength(); i++) {
            int randomIndex = random.nextInt(allowedChars.length());
            password.append(allowedChars.charAt(randomIndex));
        }

        return new PasswordResponse(password.toString());
    }
}

class PasswordRequest {
    private int length;
    private boolean includeNumbers;
    private boolean includeLowercase;
    private boolean includeUppercase;
    private boolean includeSpecial;

    public int getLength() { return length; }
    public boolean isIncludeNumbers() { return includeNumbers; }
    public boolean isIncludeLowercase() { return includeLowercase; }
    public boolean isIncludeUppercase() { return includeUppercase; }
    public boolean isIncludeSpecial() { return includeSpecial; }
}

class PasswordResponse {
    private String password;

    public PasswordResponse(String password) { this.password = password; }
    public String getPassword() { return password; }
}
