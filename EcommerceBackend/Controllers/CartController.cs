using EcommerceBackend.Data;
using EcommerceBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcommerceDbContext _context;

        public CartController(EcommerceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CartItem>> GetCart()
        {
            return _context.CartItems.ToList();
        }

        [HttpPost]
        [HttpPost]
public ActionResult<CartItem> AddToCart(CartItem cartItem)
{
    // Validate the incoming cartItem
    if (cartItem == null || cartItem.ProductId <= 0 || cartItem.Quantity <= 0)
    {
        return BadRequest("Invalid cart item. Ensure ProductId and Quantity are provided.");
    }

    // Find the product in the database
    var product = _context.Products.Find(cartItem.ProductId);
    if (product == null)
    {
        return BadRequest("Product not found.");
    }

    // Ensure sufficient stock is available
    if (product.QuantityInStock < cartItem.Quantity)
    {
        return BadRequest("Insufficient stock available.");
    }

    // Populate the product name and price automatically
    cartItem.ProductName = product.Name;
    cartItem.Price = product.Price;

    // Add the cart item to the database
    _context.CartItems.Add(cartItem);

    // Deduct the stock from the product
    product.QuantityInStock -= cartItem.Quantity;

    _context.SaveChanges();

    // Return the added cart item
    return Ok(cartItem);
}


        [HttpPut("update-quantity/{cartItemId}")]
        public IActionResult UpdateCartItemQuantity(int cartItemId, [FromQuery] int newQuantity)
        {
            // Get the cart item
            var cartItem = _context.CartItems.Find(cartItemId);
            if (cartItem == null) return NotFound("Cart item not found.");

            // Get the product associated with the cart item
            var product = _context.Products.Find(cartItem.ProductId);
            if (product == null) return NotFound("Product not found.");

            // Check if the new quantity is valid
            if (newQuantity <= 0)
            {
                return BadRequest("Quantity must be greater than zero.");
            }

            // Check if there's enough stock for the new quantity
            if (newQuantity > product.QuantityInStock + cartItem.Quantity) // Adding the existing quantity back
            {
                return BadRequest($"Not enough stock. Only {product.QuantityInStock + cartItem.Quantity} items available.");
            }

            // Update the cart item quantity
            product.QuantityInStock += cartItem.Quantity - newQuantity; // Adjust stock accordingly

            cartItem.Quantity = newQuantity;

            _context.SaveChanges();

            return Ok(cartItem);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            var cartItem = _context.CartItems.Find(id);
            if (cartItem == null) return NotFound("Item not found in cart.");

            // Get the product associated with the cart item
            var product = _context.Products.Find(cartItem.ProductId);
            if (product == null) return NotFound("Product not found.");

            // Increase the product's stock quantity by the amount removed from the cart
            product.QuantityInStock += cartItem.Quantity;

            // Remove the item from the cart
            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();

            return NoContent(); // Successfully removed the item from the cart
        }
    }
}
