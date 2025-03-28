package com.example.cognify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tic-tac-toe")
@CrossOrigin(origins = "http://localhost:5173")
public class TicTacToeController {
    private char[][] board;
    private char currentPlayer;
    private boolean gameOver;

    public TicTacToeController() {
        resetGame();
    }

    @PostMapping("/reset")
    public String resetGame() {
        board = new char[][]{
                {' ', ' ', ' '},
                {' ', ' ', ' '},
                {' ', ' ', ' '}
        };
        currentPlayer = 'X';
        gameOver = false;
        return "Game reset! Player X starts.";
    }

    @PostMapping("/move")
    public String makeMove(@RequestBody MoveRequest request) {
        if (gameOver) {
            return "Game over! Reset to start a new game.";
        }

        int row = request.getRow();
        int col = request.getCol();

        if (row < 0 || row >= 3 || col < 0 || col >= 3 || board[row][col] != ' ') {
            return "Invalid move! Try again.";
        }

        board[row][col] = currentPlayer;

        if (checkWin()) {
            gameOver = true;
            return "Player " + currentPlayer + " wins!";
        } else if (checkDraw()) {
            gameOver = true;
            return "It's a draw!";
        }

        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        return "Move accepted. Next turn: Player " + currentPlayer;
    }

    @GetMapping("/board")
public String[][] getBoard() {
    String[][] formattedBoard = new String[3][3];

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            formattedBoard[i][j] = (board[i][j] == ' ') ? "" : String.valueOf(board[i][j]);
        }
    }
    
    return formattedBoard;
}

    private boolean checkWin() {
        for (int i = 0; i < 3; i++) {
            if (board[i][0] != ' ' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) return true;
            if (board[0][i] != ' ' && board[0][i] == board[1][i] && board[1][i] == board[2][i]) return true;
        }
        return (board[0][0] != ' ' && board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
               (board[0][2] != ' ' && board[0][2] == board[1][1] && board[1][1] == board[2][0]);
    }

    private boolean checkDraw() {
        for (char[] row : board) {
            for (char cell : row) {
                if (cell == ' ') return false;
            }
        }
        return true;
    }
}

class MoveRequest {
    private int row;
    private int col;

    public int getRow() { return row; }
    public int getCol() { return col; }
}
