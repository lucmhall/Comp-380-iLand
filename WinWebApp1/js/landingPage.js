(function () {
    'use strict';

    var listRenderer;
    var headerRenderer;
    var itemRenderer;
    var pageLayout;

    // Custom event raised after the fragment is appended to the DOM.
    WinJS.Application.addEventListener('fragmentappended', function handler(e) {
        if (e.location === '/html/landingPage.html') { fragmentLoad(e.fragment, e.state); }
    });

    function updateForLayout(lv, layout) {
        pageLayout = layout;
        if (pageLayout === Windows.UI.ViewManagement.ApplicationLayoutState.snapped) {
            WinJS.UI.setOptions(lv, {
                dataSource: pageData.groups,
                itemRenderer: listRenderer,
                groupDataSource: null,
                groupRenderer: null,
                oniteminvoked: itemInvoked
            });

            lv.layout = new WinJS.UI.ListLayout();
        } else {
            var groupDataSource = new WinJS.UI.GroupDataSource(
                    new WinJS.UI.ListDataSource(pageData.groups), function (item) {
                        return {
                            key: item.data.group.key,
                            data: {
                                title: item.data.group.title,
                                click: function () {
                                    WinJS.Navigation.navigate('/html/collectionPage.html', { group: item.data.group });
                                }
                            }
                        };
                    });

            WinJS.UI.setOptions(lv, {
                dataSource: pageData.items,
                itemRenderer: itemRenderer,
                groupDataSource: groupDataSource,
                groupRenderer: headerRenderer,
                oniteminvoked: itemInvoked
            });
            lv.layout = new WinJS.UI.GridLayout({ groupHeaderPosition: 'top' });
        }
        lv.refresh();
    }

    function layoutChanged(e) {
        var list = document.querySelector('.landingList');
        if (list) {
            var lv = WinJS.UI.getControl(list);
            updateForLayout(lv, e.layout);
        }
    }

    function fragmentLoad(elements, options) {
        try {
            var appLayout = Windows.UI.ViewManagement.ApplicationLayout.getForCurrentView();
            if (appLayout) {
                appLayout.addEventListener('layoutchanged', layoutChanged);
            }
        } catch (e) { }

        WinJS.UI.processAll(elements)
            .then(function () {
                itemRenderer = elements.querySelector('.itemTemplate');
                headerRenderer = elements.querySelector('.headerTemplate');
                listRenderer = elements.querySelector('.listTemplate');
                var lv = WinJS.UI.getControl(elements.querySelector('.landingList'));
                updateForLayout(lv, Windows.UI.ViewManagement.ApplicationLayout.value);
            });
    }

    function itemInvoked(e) {
        if (pageLayout === Windows.UI.ViewManagement.ApplicationLayoutState.snapped) {
            var group = pageData.groups[e.detail.itemIndex];
            WinJS.Navigation.navigate('/html/collectionPage.html', { group: group });
        } else {
            var item = pageData.items[e.detail.itemIndex];
            WinJS.Navigation.navigate('/html/detailPage.html', { item: item });
        }
    }

    // The getGroups() and getItems() functions contain sample data.
    // TODO: Replace with custom data.
    function getGroups() {
        var colors = ['rgba(209, 211, 212, 1)', 'rgba(147, 149, 152, 1)', 'rgba(65, 64, 66, 1)'];
        
        var groups = [];

        for (var i = 0; i < 6; i++) {
            var even = (i % 2) === 0;
            groups.push({
                key: 'group' + i,
                title: '',
                backgroundColor: colors[i % colors.length],
         
                label: 'Eleifend posuere',
                description: even ? 'Lobby time.' : '',
                fullDescription: 'Lobby ' + (even ? '' : ' time!!!!.')
            });
        }

        return groups;
    }

    function getItems() {
        var colors = ['red', 'blue', 'orange','green'];
        var items = [];

        for (var g = 0, gl = pageData.groups.length; g < 1; g++) {
            var numItems = g % 2 === 0 ? 6 : 4;
            for (var i = 0; i < 4; i++) {
                items.push({
                    group: pageData.groups[g],
                    key: 'item' + i,
                    title: g + '.' + i + (i % 2 === 0 ? ' Lobby.' : ' Lobby.'),
                    subtitle: 'Click to join a lobby',
                    backgroundColor: colors[i],
                 //   backgroundImage: 'url(../images/woodu.jpg)',
                    content: (new Array(2)).join('<p>This is a sample lobby. In the final project, you will be able to see up to 3 other players here and chat with them.</p><p>Player 1: iAmDaBEsT</p><p>Player 2: l337dood</p> <p>Player 3: SuperMan</p><p>Player 4: Ron Swanson</p>'),
                    description: '.'
                });
            }
        }

        return items;
    }

    var pageData = {};
    pageData.groups = getGroups();
    pageData.items = getItems();

    WinJS.Namespace.define('landingPage', {
        fragmentLoad: fragmentLoad,
        itemInvoked: itemInvoked
    });
})();
