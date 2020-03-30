pragma solidity ^0.5.0;
import "./Ownership.sol";

contract TestFactory is Ownership {
    // establishes roles for entities
    mapping(address => bool) isFactory;
    mapping(address => bool) isHospital;
    mapping(address => bool) isLab;

    // metadata for test
    struct Test {
        address factory;
        string role;
        string result;
        bool inTransit;
        bool tested;
        bytes32 QR;
        uint date;
    }

    Test[] tests;

    mapping(uint => address) testAuthority;
    mapping(address => uint) authorityTests;
    mapping(address => bool) factoryCertified;

    address FDA = address(0);

    function becomeFDA(address entity) external onlyOwner {
        FDA = entity;
    }

    function becomeFactory(address entity) external onlyOwner {
        isFactory[entity] = true;
        authorityTests[entity] = 0;
    }

    function becomeHospital(address entity) external onlyOwner {
        isHospital[entity] = true;
        authorityTests[entity] = 0;
    }

    function becomeLab(address entity) external onlyOwner {
        isLab[entity] = true;
        authorityTests[entity] = 0;
    }

    function certifyFactory(address entity) external {
        require(msg.sender == FDA);
        factoryCertified[entity] = true;
    }

    function createTest(string calldata QR) external {
        require(isFactory[msg.sender]);
        Test memory test = Test({ factory: msg.sender, role: "factory", result: "none", tested: false, inTransit: false, QR: keccak256(abi.encodePacked(QR)), date: now });
        uint testId = tests.push(test) - 1;
        testAuthority[testId] = msg.sender;
        authorityTests[msg.sender]++;
    }

    function hospitalTransfer(uint testId) external {
        require(isFactory[msg.sender]);
        require(!tests[testId].inTransit);
        require(keccak256(abi.encodePacked((tests[testId].role))) == keccak256(abi.encodePacked(("factory"))));
        require(testAuthority[testId] == msg.sender);
        tests[testId].inTransit = true;
    }

    function hospitalObtain(uint testId, string calldata QR) external {
        require(isHospital[msg.sender]);
        require(keccak256(abi.encodePacked(QR)) == tests[testId].QR);
        require(tests[testId].inTransit);
        require(keccak256(abi.encodePacked((tests[testId].role))) == keccak256(abi.encodePacked(("factory"))));
        tests[testId].inTransit = false;
        tests[testId].role = "hospital";
        testAuthority[testId] = msg.sender;
        authorityTests[msg.sender]++;
    }

    function labTransfer(uint testId) external {
        require(isHospital[msg.sender]);
        require(!tests[testId].inTransit);
        require(keccak256(abi.encodePacked((tests[testId].role))) == keccak256(abi.encodePacked(("hospital"))));
        require(testAuthority[testId] == msg.sender);
        tests[testId].inTransit = true;
    }

    function labObtain(uint testId, string calldata QR) external {
        require(isLab[msg.sender]);
        require(keccak256(abi.encodePacked(QR)) == tests[testId].QR);
        require(tests[testId].inTransit);
        require(keccak256(abi.encodePacked((tests[testId].role))) == keccak256(abi.encodePacked(("hospital"))));
        tests[testId].inTransit = false;
        tests[testId].role = "lab";
        testAuthority[testId] = msg.sender;
        authorityTests[msg.sender]++;
    }

    function updateTest(uint testId, string calldata result) external {
        require(isLab[msg.sender]);
        require(testAuthority[testId] == msg.sender);
        require(!tests[testId].tested);
        tests[testId].result = result;
        tests[testId].tested = true;
    }

    function checkTest(uint testId) external view returns(
        address factory, address authority, string memory role, string memory result, bool tested, bool inTransit, uint date, bool certified
    ) {
        factory = tests[testId].factory;
        authority = testAuthority[testId];
        role = tests[testId].role;
        result = tests[testId].result;
        tested = tests[testId].tested;
        inTransit = tests[testId].inTransit;
        date = tests[testId].date;
        certified = factoryCertified[factory];
    }

    function totalSupply() public view returns (uint) {
        return tests.length;
    }

    function getTests(address authority) external view returns (uint[] memory) {
        uint testCount = authorityTests[authority];

        if (testCount == 0) {
            return new uint[](0);
        } else {
            uint[] memory result = new uint[](testCount);
            uint totalTests = totalSupply();
            uint resultIndex = 0;

            for (uint testId = 0; testId < totalTests; testId++) {
                if (testAuthority[testId] == authority) {
                    result[resultIndex] = testId;
                    resultIndex++;
                }
            }

            return result;
        }
    }

    function checkCertification(address entity) external view returns (bool) {
        return factoryCertified[entity];
    }
 }
