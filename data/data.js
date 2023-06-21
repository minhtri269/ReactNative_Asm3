import category from "./category";

const flowers = [
  {
    id: 1,
    name: "Confetti",
    country: "Viet Nam",
    description:
      "The bougainvillea is a woody species, but also likes to climb, clinging to other objects such as fences, or other trees, the trunk is hard, about the size of an adult's wrist, the outside has a rough, colored bark. black to slightly brown. The trunk does not grow straight, but curves and then divides into many smaller branches, spreading to the sides.",
    category: category[0].id,
    image: require("../assets/hoa-giay.png"),
    favourite: false
  },
  {
    id: 2,
    name: "Rose",
    country: "Viet Nam",
    description:
      "Rose is known as the queen of flowers. The small, green trunk is divided into many branches and branches. Rose leaves are dark green, each branch has many intertwined leaves, surrounded by a serrated border. Thorns are the most conspicuous feature of roses.",
    category: category[1].id,
    image: require("../assets/hoa-hong.png"),
    favourite: false
  },
  {
    id: 3,
    name: "Bougainvillea",
    country: "Viet Nam",
    description:
      "The bougainvillea is a woody species, but also likes to climb, clinging to other objects such as fences, or other trees, the trunk is hard, about the size of an adult's wrist, the outside has a rough, colored bark. black to slightly brown. The trunk does not grow straight, but curves and then divides into many smaller branches, spreading to the sides.",
    category: category[1].id,
    image: require("../assets/hoa-mai.png"),
    favourite: false
  },
  {
    id: 4,
    name: "Phoenix",
    country: "Viet Nam",
    description:
      "The phoenix or phoenix, the phoenix, the cycad, the western scallop (two-part nomenclature: Delonix regia) (family Fabaceae) (Chinese: 鳳凰木: phoenix tree; English: Flamboyant, Royal poinciana and Mohur tree) is a A flowering plant found in tropical and subtropical regions.",
    category: category[2].id,
    image: require("../assets/hoa-phuong.png"),
    favourite: false
  },
  {
    id: 5,
    name: "Lotus",
    country: "Viet Nam",
    description:
      "Lotus is known as a flower symbolizing the national identity of Vietnam, the national flower of the nation because of the simplicity and purity of this flower. There are usually two types of lotus flowers: white lotus and pink lotus, however pink lotus is more common and widely cultivated. Lotus flowers usually bloom in the summer.",
    category: category[1].id,
    image: require("../assets/hoa-sen.png"),
    favourite: false
  },
  {
    id: 6,
    name: "Porcelain",
    country: "Viet Nam",
    description:
      "Plumeria rubra (Plumeria rubra) is a species of plant in the genus Dai, in the family Trucaceae. This is one of the first plants to be described by Carl Linnaeus, the father of taxonomy. L. Plumeria acutifolia Poir.",
    category: category[0].id,
    image: require("../assets/hoa-su.png"),
    favourite: false
  },
  {
    id: 7,
    name: "Hydrangea",
    country: "Viet Nam",
    description:
      "Hydrangea is a cluster that grows in a large sphere, grows on the top or grows at the edge of the leaves, so the plant is very wrong. The flower cluster is a combination of thousands of beautiful little flowers with butterfly-shaped wings. Hydrangeas often have many types, blooming all year round, especially in spring to summer.",
    category: category[2].id,
    image: require("../assets/hoatucau.png"),
    favourite: false
  }
];

export default flowers;
