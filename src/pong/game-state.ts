
import {Bodies, Composite, Body, World} from "matter-js";

class GameState<User> {

  /**
   * STAGES:
   * 
   * 1. Setup (handled outside of GameState)
   * accumulate users (and assign roles, either player or observer)
   * assign users to games (starting with one game per display)
   * -> use layout.length on start to know how many games there should be
   * -> must be a power of 2
   * start the game (create the GameStates)
   * 
   * 2. Gameplay
   * players can move the paddle
   * observers can place obstacles
   * -> how often? may have to broadcast when a new obstacle can be placed
   * ---
   * the game state will know when a player scores a goal
   * after a set number of goals (or a timer), the game ends
   * 
   * 3. Game end
   * merge games by taking the winner of each (and merge all observers)
   * on the last game, we end the entire thing
   */

  private readonly players: Players<User>;
  private readonly observers: Set<User>;
  private readonly size: Vec;
  private readonly paddles: Map<Player<User>,Paddle>;
  private readonly balls: Set<Ball>;

  constructor(players: readonly [User, User], observers: Set<User>, size: Vec) {
    this.players = this.createPlayers(players);
    this.observers = observers;
    this.size = size;
    this.paddles = this.createPaddles();
    this.balls = new Set([this.createBall()]);
  }

  private createPlayers(users: readonly [User, User]): Players<User> {
    return [
      new Player(users[0], 0),
      new Player(users[1], 0)
    ];
  }

  private createPaddles(): Map<Player<User>,Paddle> {
    const y = this.size[1] / 2;
    const width = this.size[0] / 32;
    const height = this.size[1] / 4;
    return new Map([
      [this.players[0], new Paddle([0, y], [width, height])],
      [this.players[1], new Paddle([this.size[0], y], [width, height])]
    ]);
  }

  private createBall(): Ball {
    const x = this.size[0] / 2;
    const y = this.size[1] / 2;
    return new Ball([x, y], Math.min(x, y) / 64);
  }

  movePaddle(player: User, y: number): GameState<User> {
    return this;
  }

  placeObstacle(obstacle: Obstacle): GameState<User> {
    return this;
  }

  mergeGames(otherGame: GameState<User>): GameState<User> {
    // just combine the players and observers into a new game
    return this;
  }

  tick(): GameState<User> {
    // TODO: advance the game by one step
    this.balls.forEach(ball => ball.tick());
    return this;
  }

  render(): ImageData {
    return new ImageData(64 * 2, 64 * 2);
  }

}

interface Entity {

  addTo(world: World): void;
  tick(): Entity;

}

class Entity2D implements Entity {

  private readonly body: Body;

  constructor(body: Body) {
    this.body = body;
  }

  addTo(world: World): void {
    Composite.add(world, this.body);
  }

  tick(): Entity {
    return this;
  }

}

class Paddle extends Entity2D {

  constructor(location: Vec, size: Vec) {
    super(Bodies.rectangle(location[0], location[1], size[0], size[1]));
  }

}

class Ball extends Entity2D {

  constructor(location: Vec, radius: number) {
    super(Bodies.circle(location[0], location[1], radius));
  }

}

// Represents an obstruction on the pong "board"
interface Obstacle {

}

class Player<User> {

  private score: number;
  private readonly user: User;

  constructor(user: User, score: number) {
    this.user = user;
    this.score = score;
  }

  addPoint(): this {
    this.score++;
    return this;
  }

  reachedScore(minScore: number): boolean {
    return this.score >= minScore;
  }

}

type Vec = readonly [number, number];
type Players<User> = readonly [Player<User>, Player<User>];

export default GameState;