(function() {

    // window.addEventListener('resize', positionFooter);
    document.getElementById('main-container').addEventListener("change", rePositionFooter);

    function positionFooter() {
        console.log(true);
        let mainContainer = document.getElementById('main-container');
        let height = Math.max(document.documentElement.clientHeight);
        mainContainer.style.height = `${height}px`;
    }

    function rePositionFooter() {
        console.log(false);
        let mainContainer = document.getElementById('main-container');
        mainContainer.style.height = `100%`;
    }

    positionFooter();

})();