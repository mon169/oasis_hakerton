const tooltip = document.getElementById('tooltip');
const tooltipImage = document.getElementById('tooltipImage');
const tooltipText = document.getElementById('tooltipText');

document.querySelectorAll('.hoverGroup').forEach(group => {
    // 요소의 opacity 값을 data-opacity 속성으로 저장
    const opacity = window.getComputedStyle(group).opacity;
    if (opacity === '1') {
        group.setAttribute('data-opacity', '1');
    }

    group.addEventListener('mousemove', (e) => {
        if (group.getAttribute('data-opacity') === '1') {
            const tooltipData = group.getAttribute('data-tooltip');
            const imageData = group.getAttribute('data-image');
            tooltipText.textContent = tooltipData;
            tooltipImage.src = imageData;

            tooltip.style.left = (e.clientX + 10) + 'px';
            tooltip.style.top = (e.clientY + 10) + 'px';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = 1;
        }
    });

    group.addEventListener('mouseout', () => {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = 0;
    });
});