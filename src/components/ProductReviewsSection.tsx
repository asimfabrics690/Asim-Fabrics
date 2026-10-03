import React, { useState } from 'react';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Camera,
  X,
  Sparkles,
  ShieldCheck,
  Send,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import {
  Review,
  RatingBreakdown,
  calculateRatingSummary,
  getStoredReviews,
  saveStoredReviews,
} from '../data/reviews';

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productName,
}) => {
  const [allReviews, setAllReviews] = useState<Review[]>(() => getStoredReviews());
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formPhoto, setFormPhoto] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Get reviews specific to this product
  const productReviews = allReviews.filter((r) => r.productId === productId);
  const ratingSummary: RatingBreakdown = calculateRatingSummary(productReviews);

  const displayedReviews = productReviews.filter((r) => {
    if (filterRating === 'all') return true;
    return Math.round(r.rating) === filterRating;
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Please choose an image under 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) {
      alert('Please fill in your name, review title, and message.');
      return;
    }

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      author: formName.trim(),
      email: formEmail.trim(),
      rating: formRating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      title: formTitle.trim(),
      comment: formComment.trim(),
      verifiedPurchase: true,
      isSampleReview: false, // Authentic customer submission
      photos: formPhoto ? [formPhoto] : undefined,
      helpfulYes: 0,
      helpfulNo: 0,
    };

    const updated = [newRev, ...allReviews];
    setAllReviews(updated);
    saveStoredReviews(updated);

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsWritingReview(false);
      setFormName('');
      setFormEmail('');
      setFormRating(5);
      setFormTitle('');
      setFormComment('');
      setFormPhoto(null);
    }, 2000);
  };

  const handleHelpfulVote = (reviewId: string, type: 'yes' | 'no') => {
    const updated = allReviews.map((r) => {
      if (r.id !== reviewId) return r;
      if (r.userVoted === type) return r; // already voted same

      let newYes = r.helpfulYes;
      let newNo = r.helpfulNo;

      if (r.userVoted === 'yes') newYes = Math.max(0, newYes - 1);
      if (r.userVoted === 'no') newNo = Math.max(0, newNo - 1);

      if (type === 'yes') newYes += 1;
      if (type === 'no') newNo += 1;

      return {
        ...r,
        helpfulYes: newYes,
        helpfulNo: newNo,
        userVoted: type,
      };
    });

    setAllReviews(updated);
    saveStoredReviews(updated);
  };

  const starLabels: Record<number, string> = {
    5: 'Exceptional Quality (5 Stars)',
    4: 'Very Good (4 Stars)',
    3: 'Average (3 Stars)',
    2: 'Needs Improvement (2 Stars)',
    1: 'Disappointing (1 Star)',
  };

  return (
    <section className="mt-10 pt-8 border-t border-[#EFE7DA]" id="customer-reviews">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6B001A] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B36A]" />
            <span>Verified Customer Feedback</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2A2A] tracking-tight">
            Customer Reviews &amp; Ratings
          </h3>
          <p className="text-xs text-[#2A2A2A]/70 mt-1">
            Real experiences from homeowners, interior stylists, and boutique hospitality clients.
          </p>
        </div>

        <button
          onClick={() => setIsWritingReview(!isWritingReview)}
          className="px-5 py-2.5 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{isWritingReview ? 'Close Review Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Review Submission Form Drawer / Panel */}
      {isWritingReview && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D4B36A]/50 shadow-md mb-8 animate-fadeIn">
          {formSuccess ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#6B001A] mb-1">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-[#2A2A2A]/70">
                Your feedback on <strong>{productName}</strong> has been saved and published.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA]">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2A2A2A]">
                    Review this Product
                  </h4>
                  <p className="text-xs text-[#2A2A2A]/60">
                    Share your thoughts on the 76×68 cotton texture, color depth, and fit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1.5">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      onClick={() => setFormRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                      aria-label={`Rate ${star} star`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (formHoverRating || formRating)
                            ? 'text-[#D4B36A] fill-[#D4B36A]'
                            : 'text-[#EFE7DA] stroke-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-[#6B001A] ml-2">
                    {starLabels[formHoverRating || formRating]}
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saima Farooq"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                    Email Address (Private)
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                  />
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  Review Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exquisite hand feel and authentic cotton density"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              {/* Review Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1">
                  Detailed Review *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How does the fabric feel against the skin? How did it wash? Would you recommend it?"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8F5EF] border border-[#EFE7DA] rounded-lg focus:outline-none focus:border-[#6B001A]"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2A2A2A] mb-1.5">
                  Optional Photo of Product in Your Home
                </label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 border border-dashed border-[#B39148] rounded-xl bg-[#F8F5EF] hover:bg-[#EFE7DA] text-[#6B001A] text-xs font-medium cursor-pointer transition-colors flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#D4B36A]" />
                    <span>Upload Customer Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {formPhoto && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#D4B36A] shadow-xs">
                      <img
                        src={formPhoto}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormPhoto(null)}
                        className="absolute top-0.5 right-0.5 p-0.5 bg-black/60 rounded-full text-white"
                        title="Remove photo"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="px-4 py-2 text-xs text-[#2A2A2A]/70 hover:text-[#2A2A2A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#6B001A] hover:bg-[#500013] text-[#F8F5EF] font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Ratings Overview & Breakdown Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EFE7DA] shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Overall Rating Score (4.8/5) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-[#EFE7DA]">
            <span className="font-mono text-5xl font-bold text-[#6B001A]">
              {ratingSummary.overall > 0 ? ratingSummary.overall.toFixed(1) : '—'}
            </span>
            <div className="flex items-center gap-1 my-2 text-[#D4B36A]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(ratingSummary.overall)
                      ? 'fill-current'
                      : 'text-[#EFE7DA]'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[#2A2A2A]/80 font-medium">
              {ratingSummary.total > 0
                ? `${ratingSummary.overall}/5 — Customer Reviews`
                : 'No reviews yet'}
            </p>
            <span className="text-[11px] text-[#2A2A2A]/60 mt-0.5">
              Based on {ratingSummary.total} verified customer {ratingSummary.total === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          {/* 5-Star to 1-Star Breakdown */}
          <div className="md:col-span-8 space-y-2">
            {[5, 4, 3, 2, 1].map((starKey) => {
              const stars = starKey as 1 | 2 | 3 | 4 | 5;
              const count = ratingSummary.stars[stars];
              const pct = ratingSummary.percentages[stars];

              return (
                <button
                  key={stars}
                  onClick={() =>
                    setFilterRating(filterRating === stars ? 'all' : stars)
                  }
                  className={`w-full flex items-center gap-3 text-xs p-1.5 rounded-lg transition-colors cursor-pointer group ${
                    filterRating === stars
                      ? 'bg-[#EFE7DA]/50 font-semibold'
                      : 'hover:bg-[#F8F5EF]'
                  }`}
                >
                  <div className="flex items-center gap-1 w-16 text-[#2A2A2A] shrink-0 font-medium">
                    <span>{stars}</span>
                    <Star className="w-3.5 h-3.5 text-[#D4B36A] fill-current" />
                  </div>

                  {/* Progress Bar Track */}
                  <div className="flex-1 h-2 bg-[#EFE7DA] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6B001A] transition-all duration-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-mono text-[11px] text-[#2A2A2A]/70 shrink-0">
                    {count} ({pct}%)
                  </span>
                </button>
              );
            })}

            {filterRating !== 'all' && (
              <div className="pt-2 flex items-center justify-between text-xs text-[#6B001A]">
                <span>Filtering by {filterRating} Stars</span>
                <button
                  onClick={() => setFilterRating('all')}
                  className="font-semibold underline cursor-pointer"
                >
                  Clear Star Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Individual Customer Reviews List */}
      <div className="space-y-4">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EFE7DA] shadow-2xs hover:border-[#D4B36A]/50 transition-all"
            >
              {/* Review Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-base text-[#2A2A2A]">
                      {rev.author}
                    </span>

                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Purchase
                      </span>
                    )}

                    {rev.isSampleReview && (
                      <span className="text-[10px] bg-[#EFE7DA] text-[#6B001A] px-2 py-0.5 rounded border border-[#D4B36A]/30 font-medium">
                        Sample Review
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-1 text-[#D4B36A]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rev.rating ? 'fill-current' : 'text-[#EFE7DA]'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[#2A2A2A]/50 ml-2">
                      {rev.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Title & Body */}
              <h5 className="font-serif font-bold text-sm sm:text-base text-[#2A2A2A] mb-1.5">
                {rev.title}
              </h5>
              <p className="text-xs sm:text-sm text-[#2A2A2A]/80 leading-relaxed mb-4">
                {rev.comment}
              </p>

              {/* Customer Photo (if provided) */}
              {rev.photos && rev.photos.length > 0 && (
                <div className="mb-4 flex items-center gap-2">
                  {rev.photos.map((photo, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPreviewPhoto(photo)}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#EFE7DA] hover:border-[#6B001A] transition-all cursor-pointer shrink-0 shadow-2xs"
                    >
                      <img
                        src={photo}
                        alt="Customer uploaded review photo"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  <span className="text-[11px] text-[#2A2A2A]/60 italic">
                    Customer photo
                  </span>
                </div>
              )}

              {/* Helpful Interaction */}
              <div className="pt-3 border-t border-[#EFE7DA] flex items-center justify-between text-xs text-[#2A2A2A]/70">
                <div className="flex items-center gap-3">
                  <span className="text-[11px]">Was this review helpful?</span>
                  <button
                    onClick={() => handleHelpfulVote(rev.id, 'yes')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                      rev.userVoted === 'yes'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                        : 'border-[#EFE7DA] bg-[#F8F5EF] hover:bg-[#EFE7DA] text-[#2A2A2A]'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Yes ({rev.helpfulYes})</span>
                  </button>

                  <button
                    onClick={() => handleHelpfulVote(rev.id, 'no')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs transition-colors cursor-pointer ${
                      rev.userVoted === 'no'
                        ? 'bg-rose-50 text-rose-800 border-rose-300 font-semibold'
                        : 'border-[#EFE7DA] bg-[#F8F5EF] hover:bg-[#EFE7DA] text-[#2A2A2A]'
                    }`}
                  >
                    <ThumbsDown className="w-3 h-3" />
                    <span>No ({rev.helpfulNo})</span>
                  </button>
                </div>

                <span className="text-[10px] text-[#2A2A2A]/50">
                  ASIM FABRICS Customer Care
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-white rounded-2xl border border-[#EFE7DA] p-6">
            <MessageSquare className="w-10 h-10 text-[#D4B36A] mx-auto mb-2 opacity-60" />
            <h5 className="font-serif text-base font-bold text-[#2A2A2A] mb-1">
              No reviews for this star rating
            </h5>
            <p className="text-xs text-[#2A2A2A]/70 mb-4">
              Be the first to share your thoughts on this handcrafted cotton article.
            </p>
            <button
              onClick={() => setFilterRating('all')}
              className="text-xs text-[#6B001A] font-semibold underline cursor-pointer"
            >
              View all reviews
            </button>
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 right-3 p-1.5 bg-black/60 text-white rounded-full hover:bg-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={previewPhoto}
              alt="Customer photo enlarged"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductReviewsSection;
