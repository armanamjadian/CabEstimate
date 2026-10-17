// تابع کمکی برای انتخاب تمام متن یک ورودی
// وقتی کاربر روی قیمت کلیک می‌کنه، کل عدد انتخاب می‌شه
// تا کاربر بتونه سریع عدد جدید رو تایپ کنه
window.priceEdit = {
    selectAll: function (el) {
        if (!el || typeof el.select !== 'function') return;

        // با تأخیر کوتاه تا مطمئن بشیم Blazor رندر رو تموم کرده
        setTimeout(function () {
            el.focus();
            el.select();
        }, 10);
    }
};