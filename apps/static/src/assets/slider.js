class Slider {
    lastTime;

    constructor() {
        this.box = document.querySelector('#slider-progress');
        this.items = this.box.querySelectorAll('.js-slider-progress');
        this.itemsFill = this.box.querySelectorAll('.js-slider-fill');

        this.sliderText = document.querySelector('#slider-text');
        this.sliderTextItems = this.sliderText.querySelectorAll('.js-slider-text');

        this.sliderSlideBox = document.querySelector('#slider-slide-box');
        this.slides = this.sliderSlideBox.querySelectorAll('.js-slide');

        this.SLIDE_TIME = 8000;

        this.index = 0;
        this.progressSliderTimer = null;

        this.items.forEach((progressItem, index) => {
            progressItem.addEventListener('click', event => {
                this.selectIndex(index);
                event.stopPropagation();
            });
        })
    }

    selectIndex(index) {
        this.stop();
        this.index = index;
        this.markProgressForIndex(index);
        this.start();
    }

    markProgressForIndex(index) {
        this.resetProgress();

        for (let i=0; i < index; i++) {
            this.itemsFill[i].style.width = '100%';
        }
    }

    progressSlider() {
        const diff = new Date().getTime() - this.lastTime;

        if (diff >= this.SLIDE_TIME) {
            this.nextSlide();
        } else {
            this.progressCurrentSlide(diff);
        }
    }

    nextSlide() {
        this.lastTime = new Date().getTime();
        this.progress = 0;

        if (this.items.length > this.index + 1) {
            ++this.index;
        } else {
            this.index = 0;
            this.resetProgress();
        }

        this.selectSlide();
    }

    resetProgress() {
        this.itemsFill.forEach(fill => fill.style.width = '0%');
    }

    progressCurrentSlide(diff) {
        const progress = Math.round(diff / this.SLIDE_TIME * 100);
        this.items[this.index].querySelector('.js-slider-fill').style.width = `${progress}%`;
    }

    selectSlide() {
        this.sliderText.querySelector('.active').classList.remove('active');
        this.sliderTextItems[this.index].classList.add('active');

        this.box.querySelector('.active').classList.remove('active');
        this.items[this.index].classList.add('active');

        const lastActive = this.sliderSlideBox.querySelector('.active');

        if (lastActive) {
            lastActive.classList.remove('active');
            lastActive.stop?.();
        }

        const newActive = this.slides[this.index];
        newActive.classList.add('active');
        newActive.play?.();
    }

    start() {
        clearInterval(this.progressSliderTimer);

        this.lastTime = new Date().getTime();
        this.progressSliderTimer = setInterval(() => this.progressSlider(), 120);
        this.selectSlide();
    }

    stop() {
        clearInterval(this.progressSliderTimer);

        this.progressSliderTimer = undefined;
    }

    resume() {
        if (this.progressSliderTimer) {
            this.stop();

            return;
        }

        const progress = parseInt(this.box.querySelector('.active .js-slider-fill')?.style.width || 0);

        const completeTime = this.SLIDE_TIME / 100 * progress;

        this.lastTime = new Date().getTime() - completeTime;

        this.progressSliderTimer = setInterval(() => this.progressSlider(), 120);
    }
}

class CmpSlider {
    #root;
    #last;
    #handle;
    #rect;
    #height = 420;

    constructor(root) {
        this.#root = root;
        this.#last = root.querySelector('.cmp-slider__item.last');
        this.#handle = root.querySelector('.js-cmp-slider-handle');

        const listener = event => this.#slide(event);

        this.#handle.addEventListener('mousedown', () => {
            window.addEventListener('mousemove', listener);
        });

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', listener);
        });

        this.#root.play = () => this.play();
    }

    #slide(event) {
        let xPos = event.clientX - this.#getRect().left;

        if (xPos < 0) {
            xPos = 0;
        }

        if (xPos > this.#getRect().width) {
            xPos = this.#getRect().width;
        }

        this.renderRect(xPos);
    }

    #getRect() {
        if (!this.#rect?.width) {
            this.#rect = this.#root.getBoundingClientRect();
        }

        return this.#rect;
    }

    play() {
        this.renderPercent(80);

        let start;
        let status = 0;

        const ANIMATION_TIME = 2_500;
        const ANIMATION_DELAY = 500;
        const BASE_PERCENT = 20;

        const stop = () => status = 4;

        this.#root.addEventListener('click', stop);

        const animateProcess = (time) => {
            if (!start) {
                start = time;
            }

            const elapsed = time - start;

            switch (status) {
                // Задержка перед началом анимации
                case 0:
                    if (elapsed > ANIMATION_DELAY) {
                        status = 1;
                        start = time;
                    }
                    break;

                // Шаг анимации с движением влево
                case 1:
                    if (elapsed > ANIMATION_TIME) {
                        status = 2;
                        start = time;
                    } else {
                        const progress = 1 - (elapsed / ANIMATION_TIME);
                        const percent = progress * 60 + BASE_PERCENT;
                        this.renderPercent(percent);
                    }
                    break;

                // Задержка перед движением вправо
                case 2:
                    if (elapsed > ANIMATION_DELAY) {
                        status = 3;
                        start = time;
                    }
                    break;

                // Шаг анимации с движением вправо
                case 3:
                    if (elapsed > ANIMATION_TIME) {
                        status = 4;
                    } else {
                        const progress = elapsed / ANIMATION_TIME;
                        const percent = progress * 60 + BASE_PERCENT;
                        this.renderPercent(percent);
                    }
                    break;
            }

            if (status !== 4) {
                window.requestAnimationFrame(animateProcess);
            }
        }

        window.requestAnimationFrame(animateProcess);
    }

    renderPercent(percent) {
        const width = Math.round( this.#getRect().width / 100 * percent );

        this.renderRect(width);
    }

    renderRect(width) {
        this.#handle.style.left = `${width}px`;
        this.#last.style.clip = `rect(0, ${width}px, ${this.#height}px, 0)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cmpSlider = new CmpSlider(document.querySelector('.js-cmp-slider'));
    const slider = new Slider();
    window.slider = slider;

    slider.start()
});


function copyToClipboard(text) {
    if (navigator?.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        copyToClipboardFallback(text);
    }
}

function copyToClipboardFallback(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Ошибка при копировании текста: ', err);
    }

    document.body.removeChild(textArea);
}
