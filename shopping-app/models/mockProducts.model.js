/**
 * Mock product list for inventory checks (in-memory)
 * Later this will be replaced by Product model queries from MongoDB.
 */
const mockProducts = [
  { id: 1, name: "Harry Potter The Complete Collection J.K Rowling 1 To 8 Book Set Kids NEW Books", price: 68.08, stock: 5, category: "Books, Music & Movies", image: "/images/harryPotterBookSet.webp" },
  { id: 2, name: "Mens 2 Piece Suit Slim Fit Wedding Dinner Suit Business Casual Jacket & AU", price: 288.90, stock: 10, category: "Men's Clothing", image: "/images/dinnerSuit.webp" },
  { id: 3, name: "JABULANI Football | OFFICIAL MATCH BALL | WORLD CUP 2010 SOCCER Ball Size 5", price: 45.99, stock: 2, category: "Sporting Goods", image: "/images/soccer_ball.webp" },
];

module.exports = mockProducts;