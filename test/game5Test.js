const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    let found = false;
    let attack;
    while (!found) {
      const Attack = await ethers.getContractFactory("Attack5");
      attack = await Attack.deploy(game.address);
      if (attack.address.substring(2, 4) === "00") {
        found = true;
      }
    }

    console.log(`The address of the attack contract is ${attack.address}`);

    const owner = await ethers.getSigner(0);
    const ownerAddress = await owner.getAddress();

    return { game, ownerAddress, attack };
  }
  it("should be a winner", async function () {
    const { game, attack } = await loadFixture(deployContractAndSetVariables);

    await attack.attack();

    // good luck
    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
