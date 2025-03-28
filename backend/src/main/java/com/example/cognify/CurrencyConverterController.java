package com.example.cognify;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@RestController
@RequestMapping("/currency")
@CrossOrigin(origins = "http://localhost:5173")
public class CurrencyConverterController {

    private static final String API_KEY = "b86cdc7d5606fb193c545fc3"; // Replace with real key
    private static final String API_URL = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/latest/";

    @GetMapping("/convert")
    public String convertCurrency(
            @RequestParam double amount,
            @RequestParam String from,
            @RequestParam String to
    ) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = API_URL + from.toUpperCase();

            // Get exchange rate data
            Map response = restTemplate.getForObject(url, Map.class);

            if (response != null && response.get("conversion_rates") != null) {
                Map<String, Double> rates = (Map<String, Double>) response.get("conversion_rates");
                double rate = rates.get(to.toUpperCase());
                double converted = amount * rate;

                return String.format("%.2f %s = %.2f %s", amount, from.toUpperCase(), converted, to.toUpperCase());
            } else {
                return "Error fetching exchange rate.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing request: " + e.getMessage();
        }
    }
}
