package com.example.cognify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/convert")
@CrossOrigin(origins = "http://localhost:5173")
public class TemperatureController {

    @PostMapping
    public TemperatureResponse convertTemperature(@RequestBody TemperatureRequest request) {
        double result;

        if ("C".equalsIgnoreCase(request.getUnit())) 
        {
            result = (request.getTemperature() * 9 / 5) + 32; //Convert Celsius to Fahrenheit
        } 
        else if ("F".equalsIgnoreCase(request.getUnit())) 
        {
            result = (request.getTemperature() - 32) * 5 / 9; //Convert Fahrenheit to Celsius
        } 
        else 
        {
            throw new IllegalArgumentException("Invalid unit! Use 'C' or 'F'");
        }

        return new TemperatureResponse(result);
    }
}
class TemperatureRequest {
    private double temperature;
    private String unit;

    public double getTemperature() 
    {
        return temperature;
    }

    public String getUnit() 
    {
        return unit;
    }
}
class TemperatureResponse {
    private double converted;

    public TemperatureResponse(double converted) 
    { 
        this.converted = converted;
    }

    public double getConverted() 
    {
        return converted;
    }
}
