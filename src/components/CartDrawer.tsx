import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [orderComplete, setOrderComplete] = useState<any>(null);

  // Checkout form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'jazzcash'>('cod');
  const [orderNote, setOrderNote] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 4999;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 250;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10' || promoCode.trim().toUpperCase() === 'ASIM10') {
      setPromoApplied(true);
      setPromoDiscount(10);
    } else {
      alert('Invalid code. Try "WELCOME10" for 10% off your first order.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    const orderNum = `AF-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId: orderNum,
      date: new Date().toLocaleDateString('en-PK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      items: [...items],
      total,
      subtotal,
      shippingCost,
      discountAmount,
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      city: customerCity,
      paymentMethod,
    };

    setOrderComplete(orderDetails);
    onClearCart();
  };

  const generateWhatsAppOrderUrl = () => {
    const itemsList = items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.product.name} (${i.selectedSize}) × ${i.quantity} = Rs. ${
            i.product.price * i.quantity
          }`
      )
      .join('\n');

    const message = encodeURIComponent(
      `*New Order from ASIM FABRICS Website*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${customerName || 'Customer'}\n` +
        `Phone: ${customerPhone || 'Not provided'}\n` +
        `City: ${customerCity}\n` +
        `Address: ${customerAddress || 'Not provided'}\n\n` +
        `*Order Items:*\n${itemsList}\n\n` +
        `Subtotal: Rs. ${subtotal.toLocaleString()}\n` +
        `Shipping: ${shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}\n` +
        `*Grand Total: Rs. ${total.toLocaleString()}*\n` +
        `Payment Method: ${paymentMethod.toUpperCase()}\n` +
        (orderNote ? `Note: ${orderNote}\n` : '') +
        `\nPlease confirm my order and share delivery schedule!`
    );

    return `https://wa.me/923146148488?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#F8F5EF] h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EFE7DA] bg-[#F8F5EF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6B001A]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2A2A2A]">
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-[#EFE7DA] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#EFE7DA]/50 border-b border-[#EFE7DA] text-xs">
          <div className="flex justify-between items-center mb-1.5 font-medium text-[#2A2A2A]">
            {isFreeShipping ? (
              <span className="text-[#6B001A] font-semibold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Congratulations! You qualify for Free Delivery across Pakistan.
              </span>
            ) : (
              <span>
                Add <strong className="text-[#6B001A]">Rs. {amountToFreeShipping.toLocaleString()}</strong> more for FREE delivery!
              </span>
            )}
            <span className="font-mono text-[11px] font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#EFE7DA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B001A] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderComplete ? (
            /* Order Success View */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#6B001A] mb-1">
                Shukriya! Order Confirmed
              </h3>
              <p className="text-xs text-[#2A2A2A]/70 mb-4 font-mono">
                Order #{orderComplete.orderId}
              </p>
              <div className="w-full bg-white p-4 rounded-xl border border-[#EFE7DA] text-left text-xs space-y-2 mb-6 shadow-xs">
                <p>
                  <strong className="text-[#2A2A2A]">Deliver to:</strong> {orderComplete.name} ({orderComplete.phone})
                </p>
                <p>
                  <strong className="text-[#2A2A2A]">Address:</strong> {orderComplete.address}, {orderComplete.city}
                </p>
                <p>
                  <strong className="text-[#2A2A2A]">Payment Method:</strong>{' '}
                  <span className="uppercase font-semibold text-[#6B001A]">
                    {orderComplete.paymentMethod === 'cod'
                      ? 'Cash on Delivery (COD)'
                      : orderComplete.paymentMethod === 'bank'
                      ? 'Direct Bank Transfer'
                      : 'JazzCash / EasyPaisa'}
                  </span>
                </p>
                <div className="pt-2 border-t border-[#EFE7DA] flex justify-between font-bold text-sm text-[#2A2A2A]">
                  <span>Total Payable:</span>
                  <span className="text-[#6B001A] font-mono">
                    Rs. {orderComplete.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/923146148488?text=Hello%20ASIM%20FABRICS,%20I%20just%20placed%20Order%20%23${orderComplete.orderId}%20for%20Rs.%20${orderComplete.total}.%20Please%20confirm!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white font-semibold text-xs rounded-lg shadow-sm hover:bg-[#20b859] transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Notify Dispatch on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setOrderComplete(null);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="text-xs text-[#6B001A] font-semibold underline cursor-pointer"
              >
                Continue Browsing Collection
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#EFE7DA]">
                <h3 className="font-serif text-base font-bold text-[#6B001A]">
                  Delivery &amp; Payment Details
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#2A2A2A]/70 hover:text-[#6B001A] underline cursor-pointer"
                >
                  ← Back to Bag
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asim Raza"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0314 6148488"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    City *
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 54000"
                    className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  Complete Delivery Address *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="House/Apartment #, Street, Colony or Area"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-2">
                  Payment Method:
                </label>
                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#6B001A] bg-[#6B001A]/5 font-semibold text-[#6B001A]'
                        : 'border-[#EFE7DA] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#6B001A] focus:ring-[#6B001A]"
                    />
                    <span>Cash on Delivery (Pay when received)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'bank'
                        ? 'border-[#6B001A] bg-[#6B001A]/5 font-semibold text-[#6B001A]'
                        : 'border-[#EFE7DA] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="text-[#6B001A] focus:ring-[#6B001A]"
                    />
                    <span>Direct Bank Transfer (Meezan / HBL Account)</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#6B001A] bg-[#6B001A]/5 font-semibold text-[#6B001A]'
                        : 'border-[#EFE7DA] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="text-[#6B001A] focus:ring-[#6B001A]"
                    />
                    <span>JazzCash / EasyPaisa Mobile Wallet</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Special instructions or preferred delivery time"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Confirm &amp; Place Order (Rs. {total.toLocaleString()})
                </button>
              </div>

              {/* Direct WhatsApp Quick Option */}
              <div className="text-center pt-2">
                <span className="text-[11px] text-[#2A2A2A]/60 block mb-2">— OR —</span>
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#25D366] text-white font-semibold text-xs rounded-lg shadow-xs hover:bg-[#20b859] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Order via WhatsApp (+92 314 6148488)</span>
                </a>
              </div>
            </form>
          ) : items.length === 0 ? (
            /* Empty Bag View */
            <div className="py-16 text-center flex flex-col items-center">
              <ShoppingBag className="w-14 h-14 text-[#D4B36A] stroke-1 mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#2A2A2A] mb-1">
                Your Shopping Bag is Empty
              </h3>
              <p className="text-xs text-[#2A2A2A]/70 max-w-xs mb-6">
                Explore our export quality 76×68 cotton bedsheets and premium printed fabrics.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-[#6B001A] text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-[#500013] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-xl border border-[#EFE7DA] shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-[#EFE7DA]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#2A2A2A] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[#2A2A2A]/70 block">
                          Size: {item.selectedSize}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EFE7DA] rounded-md overflow-hidden bg-[#F8F5EF]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-[#EFE7DA] transition-colors cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-[#2A2A2A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-[#EFE7DA] transition-colors cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#6B001A] tabular-nums">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#EFE7DA] hover:bg-[#D4B36A]/30 text-[#6B001A] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <p className="text-[11px] text-emerald-700 font-medium">
                  ✓ Promo applied: 10% discount on order!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout Actions */}
        {items.length > 0 && !orderComplete && !isCheckingOut && (
          <div className="p-5 border-t border-[#EFE7DA] bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-[#2A2A2A]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount (10%)</span>
                  <span className="font-mono tabular-nums">-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Delivery</span>
                <span className="font-mono tabular-nums">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `Rs. ${shippingCost}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EFE7DA] flex justify-between text-base font-bold text-[#2A2A2A]">
                <span>Total Amount</span>
                <span className="font-mono text-[#6B001A] text-lg tabular-nums">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] text-white font-semibold text-xs rounded-lg shadow-xs hover:bg-[#20b859] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Direct WhatsApp Checkout</span>
            </a>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#2A2A2A]/60 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#D4B36A]" /> 100% Cotton Guarantee
              </span>
              <span>·</span>
              <span>Cash on Delivery across Pakistan</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
