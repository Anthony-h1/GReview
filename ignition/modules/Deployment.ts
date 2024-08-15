import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const DeploymentModule = buildModule('DeploymentModule', (m) => {
  // Deploy the RewardToken contract
  const RewardToken = m.contract('RewardToken');

  // Deploy the Comment contract with the address of the RewardToken
  const Comment = m.contract('Comment', [RewardToken]);

  // Get the deployer's account (typically the first account)
  const owner = m.getAccount(0);

  // Set the Comment contract as the authorized minter in RewardToken
  m.call(RewardToken, 'setCommentContract', [Comment], {
    from: owner,
  });

  return { RewardToken, Comment };
});

export default DeploymentModule;
