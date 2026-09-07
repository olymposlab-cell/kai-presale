// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/// @title KAI community airdrop — pull claim, merkle allowlist
/// @notice Token cannot mint. This contract must be funded from the treasury Safe.
///         One claim per wallet. Root is set by the owner (treasury).
contract KaiAirdrop {
    IERC20 public immutable kai;
    address public owner;
    bytes32 public root;
    mapping(address => bool) public claimed;

    event RootUpdated(bytes32 indexed previous, bytes32 indexed next);
    event Claimed(address indexed wallet, uint256 amount);
    event Recovered(address indexed to, uint256 amount);

    error NotOwner();
    error NoRoot();
    error AlreadyClaimed();
    error BadProof();
    error TransferFailed();

    constructor(address owner_, IERC20 kai_) {
        require(owner_ != address(0) && address(kai_) != address(0), "KAI: zero");
        owner = owner_;
        kai = kai_;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function setRoot(bytes32 next) external onlyOwner {
        emit RootUpdated(root, next);
        root = next;
    }

    function claim(uint256 amount, bytes32[] calldata proof) external {
        if (root == bytes32(0)) revert NoRoot();
        if (claimed[msg.sender]) revert AlreadyClaimed();
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, amount))));
        if (!_verify(proof, root, leaf)) revert BadProof();
        claimed[msg.sender] = true;
        emit Claimed(msg.sender, amount);
        if (!kai.transfer(msg.sender, amount)) revert TransferFailed();
    }

    function recover(address to, uint256 amount) external onlyOwner {
        if (!kai.transfer(to, amount)) revert TransferFailed();
        emit Recovered(to, amount);
    }

    function _verify(bytes32[] calldata proof, bytes32 merkleRoot, bytes32 leaf) private pure returns (bool) {
        bytes32 computed = leaf;
        for (uint256 i = 0; i < proof.length; ++i) {
            computed = _pair(computed, proof[i]);
        }
        return computed == merkleRoot;
    }

    function _pair(bytes32 a, bytes32 b) private pure returns (bytes32) {
        return a < b
            ? keccak256(abi.encodePacked(a, b))
            : keccak256(abi.encodePacked(b, a));
    }
}
