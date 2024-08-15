// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./rewardToken.sol"; 

contract Comment is Ownable, Pausable {

    struct CommentData {
        address commenter;
        string content;
        uint32 likes;
        uint32 dislikes;
        uint256 timestamp;
        bool rewarded;
        uint256 claimableTokens;
    }

    struct Topic {
        string topicName;
        mapping(address => CommentData) commentmetadata;
        uint32 commentCount;
    }
    
    mapping(uint32 => Topic) public topics;
    RewardToken public token; 
    
    event List(string topicName, uint256 timestamp);
    event CommentCreated(uint32 topicID, string comment, uint32 likes, uint32 dislikes, uint256 timestamp);
    event TokensClaimed(address indexed user, uint32 indexed topicID, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = RewardToken(_tokenAddress);
    }

    modifier OneComment(uint32 topicID) {
        require(bytes(topics[topicID].commentmetadata[msg.sender].content).length == 0, "You have already commented");
        _;
    }

    modifier ValidForReward(uint32 topicID) {
        require(bytes(topics[topicID].commentmetadata[msg.sender].content).length > 0, "No comment valid for reward");
        _;
    }

    function topicList(uint32 _id, string memory _topicName) public onlyOwner {
        Topic storage newTopic = topics[_id];
        newTopic.topicName = _topicName;
        newTopic.commentCount = 0;

        emit List(_topicName, block.timestamp);
    }

    function createComment(uint32 topicID, address commenter, string memory comment_content, uint32 likes, uint32 dislikes) public OneComment(topicID) {
        require(bytes(comment_content).length > 0, "Comment content cannot be empty");
        require(bytes(topics[topicID].topicName).length > 0, "Topic does not exist");
        require(likes > 100 && likes * 100 >= dislikes * 160, "Comment did not reach 60% more likes than dislikes");

        uint256 claimableAmount = calculateClaimableTokens(likes, dislikes);

        CommentData memory data = CommentData(
            commenter,                 // Address of the commenter
            comment_content,           // Content of the comment
            likes,                     // Number of likes
            dislikes,                  // Number of dislikes
            block.timestamp,           // Timestamp of when the comment was created
            false,                     // Initially not rewarded
            claimableAmount            // Amount of tokens claimable
        );

        topics[topicID].commentmetadata[commenter] = data;
        topics[topicID].commentCount++;

        emit CommentCreated(topicID, comment_content, likes, dislikes, block.timestamp);
    }

    function calculateClaimableTokens(uint32 likes, uint32 dislikes) internal pure returns (uint256) {
        if (likes * 100 >= dislikes * 160) {
            return 1 * 10 ** 18; // 1 token if criteria met
        }
        return 0;
    }

    function checkAndClaimableReward(uint32 topicID) public view ValidForReward(topicID) returns (bool, uint256) {
        CommentData storage userComment = topics[topicID].commentmetadata[msg.sender];

        if (userComment.likes * 100 >= userComment.dislikes * 160 && !userComment.rewarded) {
            uint256 claimableAmount = userComment.claimableTokens;
            return (true, claimableAmount);
        } else {
            return (false, 0);
        }
    }

    function claimReward(uint32 topicID) public ValidForReward(topicID) {
        CommentData storage userComment = topics[topicID].commentmetadata[msg.sender];

        // Ensure only the original commenter can claim the reward
        require(userComment.commenter == msg.sender, "Only the original commenter can claim the reward");
        
        // Requirement: likes must be at least 60% greater than dislikes
        require(userComment.likes * 100 >= userComment.dislikes * 160, "Likes are not sufficient to claim reward");
        require(!userComment.rewarded, "Reward already claimed for this comment");

        uint256 rewardAmount = 1 * 10 ** 18; 

        // Mint the tokens to the user's wallet using the RewardToken contract
        token.mint(msg.sender, rewardAmount);

        // Mark this comment as rewarded
        userComment.rewarded = true;

        emit TokensClaimed(msg.sender, topicID, rewardAmount);
    }

    function getComment(address userAddress, uint32 topicID) public view returns (CommentData memory) {
        return topics[topicID].commentmetadata[userAddress];
    }
}
