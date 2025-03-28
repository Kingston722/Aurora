package com.example.cognify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password-checker")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordStrengthController {

    @PostMapping("/check")
    public String checkPasswordStrength(@RequestBody PasswordRequest request) {
        if (request == null || request.getPassword() == null || request.getPassword().isEmpty()) {
            return "Error: Password cannot be empty.";
        }

        String password = request.getPassword();

        if (password.length() < 8) {
            return "Weak: Password must be at least 8 characters long.";
        }

        boolean hasUppercase = password.matches(".*[A-Z].*");
        boolean hasLowercase = password.matches(".*[a-z].*");
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecialChar = password.matches(".*[!@#$%^&*()\\-_=+<>?/{}\\[\\]|].*");

        if (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
            return "Medium: Use a mix of uppercase, lowercase, numbers, and special characters.";
        }

        return "Strong: Your password is secure!";
    }

    public static class PasswordRequest {
        private String password;

        public String getPassword() { return password; }

        public void setPassword(String password) { this.password = password; }
    }
}
