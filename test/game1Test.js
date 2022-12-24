const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game1", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game1");
    const game = await Game.deploy();

    return { game };
  }

  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    await game.unlock();
    await game.win();

    // leave this testing assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
