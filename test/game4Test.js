const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const owner = await ethers.getSigner(0);
    const player = await ethers.getSigner(1);
    const playerAddress = await player.getAddress();
    const ownerAddress = await owner.getAddress();

    return { game, owner, player, playerAddress, ownerAddress };
  }
  it("should be a winner", async function () {
    const { game, owner, player, playerAddress, ownerAddress } =
      await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(playerAddress);

    await game.connect(player).win(ownerAddress);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
