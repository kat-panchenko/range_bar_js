document.addEventListener('DOMContentLoaded', () => {

    const data = [
        [[1, 6500, 2, 15000], [2, 12000, 4, 25000], [3, 16000, 7, 20500], [4, 24000, 12, 35000], [6, 35000, 16, 42700]],
        [[1, 7000, 2, 15000], [2, 13000, 5, 30000], [3, 19000, 10, 40000], [5, 30000, 13, 45500]],
        [[1, 7000, 3, 22500], [2, 13000, 8, 20000], [4, 24000, 11, 40500]],
        [[1, 7000, 5, 37500], [3, 18000, 10, 30000]],
        [[2, 12000, 5, 30500]],
    ];

    const start = document.getElementById('start'),
        end = document.getElementById('end'),
        dayThis = document.querySelector('.day_this'),
        moneyThis = document.querySelector('.money_this'),
        dayOther = document.querySelector('.day_other'),
        moneyOther = document.querySelector('.money_other'),
        compareRange = document.querySelector('.compare-range');

    const declOfNum = (n, t) => t[(n % 100 > 4 && n % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(n % 10 < 5) ? n % 10 : 5]];

    const showResult = arr => {
        const [dayT, moneyT, dayO, moneyO] = arr,
            month = ['month', 'months', 'months'];

        dayThis.textContent = `${dayT} ${declOfNum(dayT, month)}`;
        moneyThis.textContent = `${moneyT} UAH`;
        dayOther.textContent = `${dayO} ${declOfNum(dayO, month)}`;
        moneyOther.textContent = `${moneyO} UAH`;
    };

    const calcResult = () => {
        const startValue = parseInt(start.value),
            endValue = parseInt(end.value);

        if (startValue === endValue) {
            showResult([0, 0, 0, 0]);
        } else {
            showResult(data[startValue][endValue - startValue - 1]);
        }
    };

    function handler() {
        if (start.value > end.value || end.value < start.value) {
            start.value = end.value = this.value;
        }
        calcResult();
    }

    const changeRange = event => {
        const target = event.target;
        if (target.classList.contains('change_range')) {
            const parent = target.closest('#started') || target.closest('#ended'),
                range = parent.querySelector('.range');

            range.value = target.dataset.level;
            handler.apply(range);
        }
    };

    start.addEventListener('change', handler);
    end.addEventListener('change', handler);
    compareRange.addEventListener('click', changeRange);

    document.querySelectorAll('.change_range').forEach((el) => el.style.cursor = 'pointer');

    calcResult();
});