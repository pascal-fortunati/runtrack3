document.addEventListener('DOMContentLoaded', function() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Tabs.init(document.querySelectorAll('.tabs'), {
        duration: 300,
        swipeable: true
    });
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
        hoverEnabled: false,
        direction: 'top'
    });
});