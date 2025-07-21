import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChainWord {
  word: string;
  disclosed: boolean;
  showHint: boolean;
  underscores: string[];
}

@Component({
  selector: 'app-chain-reaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chain-reaction.component.html',
  styleUrl: './chain-reaction.component.scss'
})
export class ChainReactionComponent {
  teamName = 'Alpha';
  points = 0;
  lives = 3;
  livesArray: boolean[] = [true, true, true];
  timeLeft = 90; // seconds remaining
  guess = '';
  inputDisabled = false;
  guessFeedback = '';  // 'correct' or 'incorrect'
  showLetterHint = false;
  nextWordFirstLetter = '';
  gameOver = false;
  guessedCount = 0;
  showHowToPlay = false;
  currentWordIndex = 0;

  // Main word chain (edit as needed)
  displayWords: ChainWord[] = [
    {
      word: 'butter',
      disclosed: true,
      showHint: false,
      underscores: []
    },
    {
      word: 'butterfly',
      disclosed: false,
      showHint: false,
      underscores: new Array('butterfly'.length - 1).fill('_')
    },
    {
      word: 'yellow',
      disclosed: false,
      showHint: false,
      underscores: new Array('yellow'.length - 1).fill('_')
    },
    {
      word: 'window',
      disclosed: false,
      showHint: false,
      underscores: new Array('window'.length - 1).fill('_')
    },
    {
      word: 'shopping',
      disclosed: false,
      showHint: false,
      underscores: new Array('shopping'.length - 1).fill('_')
    },
    {
      word: 'garden',
      disclosed: false,
      showHint: false,
      underscores: new Array('garden'.length - 1).fill('_')
    },
    {
      word: 'snake',
      disclosed: false,
      showHint: false,
      underscores: new Array('snake'.length - 1).fill('_')
    },
    {
      word: 'ladder',
      disclosed: false,
      showHint: false,
      underscores: new Array('ladder'.length - 1).fill('_')
    },
    {
      word: 'board',
      disclosed: false,
      showHint: false,
      underscores: new Array('board'.length - 1).fill('_')
    },
    {
      word: 'game',
      disclosed: false,
      showHint: false,
      underscores: new Array('game'.length - 1).fill('_')
    }
  ];

  // For summary at end (could be copy of displayWords)
  get chainWords(): ChainWord[] {
    return this.displayWords;
  }

  submitGuess(): void {
    if (this.gameOver || this.inputDisabled) return;

    const answer = this.displayWords[this.currentWordIndex + 1];
    if (!answer) {
      this.checkGameOver();
      return;
    }

    if (this.guess.trim().toLowerCase() === answer.word.toLowerCase()) {
      answer.disclosed = true;
      answer.showHint = false;
      this.points += 5;
      this.guessFeedback = 'correct';
      this.guessedCount++;
      this.currentWordIndex++;
      this.showLetterHint = false;
      this.nextWordFirstLetter = '';
    } else {
      this.lives--;
      this.livesArray[this.lives] = false;
      this.points = Math.max(0, this.points - 5);
      this.guessFeedback = 'incorrect';
      answer.showHint = true;
      this.showLetterHint = true;
      this.nextWordFirstLetter = answer.word.charAt(0);
      // Update underscores, leaving first letter shown
      answer.underscores = new Array(answer.word.length - 1).fill('_');
      if (this.lives === 0) {
        this.inputDisabled = true;
        setTimeout(() => this.finishGame(), 800);
      }
    }
    this.guess = '';
  }

  finishGame(): void {
    this.gameOver = true;
    this.inputDisabled = true;
    // Optionally reveal the rest of the words, if desired:
    // this.displayWords.forEach(word => word.disclosed = true);
  }

  checkGameOver(): void {
    if (
      this.guessedCount === this.displayWords.length - 1 ||
      this.lives === 0 ||
      this.timeLeft <= 0
    ) {
      this.finishGame();
    }
  }

  restartGame(): void {
    this.points = 0;
    this.lives = 3;
    this.livesArray = [true, true, true];
    this.timeLeft = 90;
    this.guess = '';
    this.inputDisabled = false;
    this.guessFeedback = '';
    this.showLetterHint = false;
    this.nextWordFirstLetter = '';
    this.gameOver = false;
    this.guessedCount = 0;
    this.currentWordIndex = 0;

    // Reset displayWords
    this.displayWords.forEach((word, idx) => {
      word.disclosed = idx === 0;
      word.showHint = false;
      word.underscores = new Array(word.word.length - 1).fill('_');
      if (idx === 0) word.underscores = [];
    });
  }

  goHome(): void {
    // Implement your routing/navigation here
    // For example, use Angular router to navigate home, or emit an event
  }
}
