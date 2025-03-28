package com.example.cognify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/grades")
@CrossOrigin(origins = "http://localhost:5173")
public class GradeCalculatorController {

    @PostMapping("/average")
    public GradeResponse calculateAverage(@RequestBody GradeRequest request) {
        double[] grades = request.getGrades();

        if (grades == null || grades.length == 0) {
            throw new IllegalArgumentException("No grades provided!");
        }

        double sum = 0;
        for (double grade : grades) {
            sum += grade;
        }

        double average = sum / grades.length;
        return new GradeResponse(average);
    }
}

class GradeRequest {
    private double[] grades;

    public double[] getGrades() {
        return grades;
    }
}

class GradeResponse {
    private double average;

    public GradeResponse(double average) {
        this.average = average;
    }

    public double getAverage() {
        return average;
    }
}
