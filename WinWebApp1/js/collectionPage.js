(function () {
    'use strict';

    // Custom event raised after the fragment is appended to the DOM.
    WinJS.Application.addEventListener('fragmentappended', function handler(e) {
        if (e.location === '/html/collectionPage.html') { fragmentLoad(e.fragment, e.state); }
    });

    function updateForLayout(lv, layout) {
        var layoutState = Windows.UI.ViewManagement.ApplicationLayoutState;
        if (layout === layoutState.snapped) {
            lv.layout = new WinJS.UI.ListLayout();
        } else {
            lv.layout = new WinJS.UI.GridLayout({ groupHeaderPosition: 'left' });
        }
        lv.refresh();
    }

    function layoutChanged(e) {
        var list = document.querySelector('.collectionList');
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
                var group = (options && 'group' in options) ? options.group : pageData.groups[0];
                var groupDataSource = new WinJS.UI.GroupDataSource(
                    new WinJS.UI.ListDataSource(pageData.groups), function (item) {
                        return {
                            key: group.key,
                            data: group
                        };
                    });

                elements.querySelector('.pageTitle').textContent = group.title;

                var lv = WinJS.UI.getControl(elements.querySelector('.collectionList'));
                WinJS.UI.setOptions(lv, {
                    dataSource: pageData.items.filter(function (item) { return item.group.key === group.key }),
                    itemRenderer: elements.querySelector('.itemTemplate'),
                    groupDataSource: groupDataSource,
                    groupRenderer: elements.querySelector('.headerTemplate'),
                    oniteminvoked: itemInvoked
                });
                updateForLayout(lv, Windows.UI.ViewManagement.ApplicationLayout.value);
            });
    }

    function itemInvoked(e) {
        var item = pageData.items[e.detail.itemIndex];
        WinJS.Navigation.navigate('/html/detailPage.html', { item: item });
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
                title: 'Welcome to our Sample Lobby.',
                backgroundColor: 'white',
                label: 'Eleifend posuere',
                description: even ? 'This is an example lobby.' : 'This is an example lobby.',
                fullDescription: 'You are in.' + (even ? '' : '  a lobby.')
            });
        }

        return groups;
    }

    function getItems() {
        var colors = ['rgba(209, 211, 212, 1)', 'rgba(147, 149, 152, 1)', 'rgba(65, 64, 66, 1)'];
        var items = [];

        for (var g = 0, gl = pageData.groups.length; g < gl; g++) {
            var numItems = g % 2 === 0 ? 6 : 4;
            for (var i = 0; i < numItems; i++) {
                items.push({
                    group: pageData.groups[g],
                    key: 'item' + i,
                    title: g + '.' + i + (i % 2 === 0 ? 'Lets go to a lobby.' : 'Click me.'),
                    subtitle: 'Phasellus faucibus',
                    backgroundColor: colors[i % colors.length],
                    content: (new Array(16)).join('<p>This is a lobby</p>'),
                    description: 'This is a simple description.'
                });
            }
        }

        return items;
    }

    var pageData = {};
    pageData.groups = getGroups();
    pageData.items = getItems();

    WinJS.Namespace.define('collectionPage', {
        fragmentLoad: fragmentLoad,
        itemInvoked: itemInvoked
    });
})();
