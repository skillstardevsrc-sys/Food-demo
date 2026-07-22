// ==========================================================================
// EBTY BEAUTY HERO SECTION - INTERACTIVE LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. ANNOUNCEMENT BAR CLOSE
    // ----------------------------------------------------------------------
    const closeBarBtn = document.getElementById('closeBarBtn');
    const announcementBar = document.getElementById('announcementBar');
    
    if (closeBarBtn && announcementBar) {
        closeBarBtn.addEventListener('click', () => {
            announcementBar.style.display = 'none';
        });
    }

    // ----------------------------------------------------------------------
    // 2. THEME MOOD SWITCHER (Sunset, Peach, Amber)
    // ----------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (themeToggleBtn && themeMenu) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!themeMenu.contains(e.target) && e.target !== themeToggleBtn) {
                themeMenu.classList.remove('active');
            }
        });

        themeOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const selectedTheme = opt.getAttribute('data-theme');
                document.body.className = `theme-${selectedTheme}`;
                
                themeOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                themeMenu.classList.remove('active');
                showToast(`Switched color mood to ${opt.textContent.trim()}`);
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. PRODUCT SWITCHER LOGIC
    // ----------------------------------------------------------------------
    const selectorBtns = document.querySelectorAll('.selector-btn');
    const mainProductImg = document.getElementById('mainProductImg');
    const eyebrowText = document.getElementById('eyebrowText');
    const productTitleHighlight = document.getElementById('productTitleHighlight');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const productOldPrice = document.getElementById('productOldPrice');
    const activeStepNum = document.getElementById('activeStepNum');

    const spec1Val = document.getElementById('spec1Val');
    const spec2Val = document.getElementById('spec2Val');
    const spec3Val = document.getElementById('spec3Val');

    let currentProduct = {
        name: "Luminous Vitamin C Serum",
        price: 68,
        img: "assets/images/serum.png",
        qty: 1
    };

    const productList = [
        {
            name: "Luminous Vitamin C Serum",
            price: 68,
            img: "assets/images/serum.png"
        },
        {
            name: "Velvet Silk Moisture Cream",
            price: 82,
            img: "assets/images/cream.png"
        },
        {
            name: "Botanical Elixir Radiance Oil",
            price: 74,
            img: "assets/images/oil.png"
        }
    ];

    selectorBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            // Active Class UI
            selectorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Image cross-fade effect
            mainProductImg.classList.add('changing');

            setTimeout(() => {
                const newImg = btn.getAttribute('data-img');
                const newHighlight = btn.getAttribute('data-highlight');
                const newDesc = btn.getAttribute('data-desc');
                const newPrice = btn.getAttribute('data-price');
                const newOldPrice = btn.getAttribute('data-oldprice');
                const newSpec1 = btn.getAttribute('data-spec1');
                const newSpec2 = btn.getAttribute('data-spec2');
                const newSpec3 = btn.getAttribute('data-spec3');
                const productName = btn.getAttribute('data-name');

                // Update text elements
                mainProductImg.src = newImg;
                eyebrowText.textContent = `Botanical Elixir Series No. 0${idx + 1}`;
                productTitleHighlight.textContent = newHighlight;
                productDescription.textContent = newDesc;
                productPrice.textContent = newPrice;
                productOldPrice.textContent = newOldPrice;
                activeStepNum.textContent = `0${idx + 1}`;

                spec1Val.textContent = newSpec1;
                spec2Val.textContent = newSpec2;
                spec3Val.textContent = newSpec3;

                // Update state
                currentProduct = {
                    name: productName,
                    price: parseInt(newPrice.replace('$', '')),
                    img: newImg,
                    qty: 1
                };

                mainProductImg.classList.remove('changing');
            }, 250);
        });
    });

    // ----------------------------------------------------------------------
    // 4. CART & DRAWER LOGIC
    // ----------------------------------------------------------------------
    let cartItems = [
        { name: "Luminous Vitamin C Serum", price: 68, img: "assets/images/serum.png", qty: 1 },
        { name: "Velvet Silk Moisture Cream", price: 82, img: "assets/images/cream.png", qty: 1 }
    ];

    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.getElementById('cartCount');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerItemsContainer = document.getElementById('drawerItems');
    const drawerSubtotal = document.getElementById('drawerSubtotal');
    const addToCartBtn = document.getElementById('addToCartBtn');

    function updateCartUI() {
        // Count total items
        const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
        cartCount.textContent = totalCount;

        // Render Drawer List
        drawerItemsContainer.innerHTML = '';
        let subtotal = 0;

        cartItems.forEach((item, i) => {
            subtotal += item.price * item.qty;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <strong>${item.name}</strong>
                    <span>$${item.price} USD</span>
                    <div class="qty-controls">
                        <button class="qty-btn minus" data-index="${i}">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn plus" data-index="${i}">+</button>
                    </div>
                </div>
                <strong style="font-family: var(--font-heading); font-size: 1.1rem;">$${item.price * item.qty}</strong>
            `;
            drawerItemsContainer.appendChild(itemEl);
        });

        drawerSubtotal.textContent = `$${subtotal}.00`;

        // Attach minus/plus listeners
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                if (cartItems[idx].qty > 1) {
                    cartItems[idx].qty--;
                } else {
                    cartItems.splice(idx, 1);
                }
                updateCartUI();
            });
        });

        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                cartItems[idx].qty++;
                updateCartUI();
            });
        });
    }

    // Initialize cart UI
    updateCartUI();

    // Open/Close Drawer
    if (cartBtn && cartDrawerOverlay && closeDrawerBtn) {
        cartBtn.addEventListener('click', () => {
            cartDrawerOverlay.classList.add('active');
        });

        closeDrawerBtn.addEventListener('click', () => {
            cartDrawerOverlay.classList.remove('active');
        });

        cartDrawerOverlay.addEventListener('click', (e) => {
            if (e.target === cartDrawerOverlay) {
                cartDrawerOverlay.classList.remove('active');
            }
        });
    }

    // Add to Cart Action
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Check if item already exists in cart
            const existingIndex = cartItems.findIndex(i => i.name === currentProduct.name);
            if (existingIndex > -1) {
                cartItems[existingIndex].qty++;
            } else {
                cartItems.push({ ...currentProduct });
            }

            updateCartUI();
            showToast(`Added ${currentProduct.name} to bag!`);

            // Open drawer after a brief moment
            setTimeout(() => {
                cartDrawerOverlay.classList.add('active');
            }, 400);
        });
    }

    // ----------------------------------------------------------------------
    // 5. VIDEO MODAL LOGIC
    // ----------------------------------------------------------------------
    const watchRitualBtn = document.getElementById('watchRitualBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideoModal = document.getElementById('closeVideoModal');

    if (watchRitualBtn && videoModal && closeVideoModal) {
        watchRitualBtn.addEventListener('click', () => {
            videoModal.classList.add('active');
        });

        closeVideoModal.addEventListener('click', () => {
            videoModal.classList.remove('active');
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. TOAST NOTIFICATION
    // ----------------------------------------------------------------------
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout;

    function showToast(msg) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = msg;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // ----------------------------------------------------------------------
    // 7. SUBTLE PARALLAX TILT EFFECT ON HERO STAGE
    // ----------------------------------------------------------------------
    const visualStage = document.getElementById('visualStage');
    if (visualStage && window.innerWidth > 1024) {
        visualStage.addEventListener('mousemove', (e) => {
            const rect = visualStage.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const tiltX = (y / rect.height) * -8;
            const tiltY = (x / rect.width) * 8;

            visualStage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        visualStage.addEventListener('mouseleave', () => {
            visualStage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            visualStage.style.transition = 'transform 0.5s ease';
        });
    }
});
