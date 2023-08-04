import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployTSPAccountFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()

  const entrypoint = await hre.deployments.get('EntryPoint')
  const _gasPrice = await provider.getGasPrice()
  const maxFeePerGas = _gasPrice.mul(2)
  const ret = await hre.deployments.deploy(
    'TSPAccountFactory', {
      from,
      args: [entrypoint.address],
      gasLimit: 4e8,
      maxFeePerGas: maxFeePerGas,
      maxPriorityFeePerGas: maxFeePerGas,
      deterministicDeployment: true
    })
  console.log('==TSPAccountFactory addr=', ret.address)
  console.log('gas', ret.receipt?.cumulativeGasUsed)
}

export default deployTSPAccountFactory
