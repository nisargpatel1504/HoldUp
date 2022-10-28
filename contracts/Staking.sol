pragma solidity ^0.8.0;

contract Staking{
    address public owner;
    struct Position {
        uint positionId;
        address walletAddress;
        uint createdDate;
        uint unlockDate;
        uint percentInterest;
        uint weiStaked;
        uint weiInterest;
        bool open;
    }
    uint public currentPositionId;
    mapping(uint => Position) public positions;
    mapping(address => uint[]) public positionIdsByAddress;
    mapping(uint => uint ) public tiers;
    uint[] public lockPeriods;
    constructor() payable{
        owner = msg.sender;
        tiers[30] = 700;
        tiers[90] = 1000;
        tiers[180] = 1200;
        lockPeriods.push(30);
        lockPeriods.push(90);
        lockPeriods.push(180);
    }
    function stakeEther(uint numDays) external payable {
        require(tiers[numDays] > 0, "Mapping not found");
        positions[currentPositionId] = Position({
        positionId : currentPositionId,
        walletAddress:  msg.sender, 
        createdDate: block.timestamp,
        unlockDate: block.timestamp + (numDays * 1 days),
        percentInterest:tiers[numDays],
        weiStaked: msg.value,
        weiInterest: calculateInterest(tiers[numDays],msg.value),
        open: true
        }
        );
        positionIdsByAddress[msg.sender].push(currentPositionId);
        currentPositionId +=1;
    }

    function calculateInterest(uint basisPoints, uint weiAmount) private pure returns(uint){
        return basisPoints * weiAmount / 10000 ;
    }

    function modifyLockPeriods(uint numDays , uint basisPoints) external{
        require(owner == msg.sender,"Only owner may modify staking period");
        tiers[numDays] = basisPoints;
        lockPeriods.push(numDays);
    }

    function getLockPeriods() external view returns(uint[] memory){
        return lockPeriods; 
    }

    function getInterestRate(uint numDays) external view returns(uint){
        return tiers[numDays];
    }

    function getPositionById(uint positionId) external view returns(Position memory){
        return positions[positionId];
    }

    function getPositionIdsForAddress( address walletAddress)external view returns(uint[] memory){
        return positionIdsByAddress[walletAddress];
    }
    
    function changeUnlockDate(uint positionId, uint newUnlockDate) external {
        require(owner == msg.sender,'only owner may modify unlock date');
        positions[positionId].unlockDate = newUnlockDate;
    }

    function closePosition(uint positionId) external {
        require(positions[positionId].walletAddress == msg.sender,'only position creator modify position');
        require(positions[positionId].open == true,'position is closed');
        positions[positionId].open = false;
        if(block.timestamp > positions[positionId].unlockDate){
            uint amount = positions[positionId].weiStaked +  positions[positionId].weiInterest;
            payable(msg.sender).call{value:amount}("");
        }else{
            payable(msg.sender).call{value:positions[positionId].weiStaked}("");
        }
    }


}