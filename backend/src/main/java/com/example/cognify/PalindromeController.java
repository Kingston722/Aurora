package com.example.cognify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/palindrome")
@CrossOrigin(origins = "http://localhost:5173")
public class PalindromeController {

    @PostMapping
    public PalindromeResponse checkPalindrome(@RequestBody PalindromeRequest request) {
        String cleanedText = request.getText().replaceAll("[^a-zA-Z0-9]", "").toLowerCase(); 
        String reversedText = new StringBuilder(cleanedText).reverse().toString();

        boolean isPalindrome = cleanedText.equals(reversedText);
        return new PalindromeResponse(isPalindrome);
    }
}

class PalindromeRequest {
    private String text;

    public String getText() {
        return text;
    }
}

class PalindromeResponse {
    private boolean isPalindrome;

    public PalindromeResponse(boolean isPalindrome) {
        this.isPalindrome = isPalindrome;
    }

    public boolean getIsPalindrome() {
        return isPalindrome;
    }
}
