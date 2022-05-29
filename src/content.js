window.addEventListener('load', main, false);

function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
        if (document.getElementsByClassName('form-inline') != null) {
            clearInterval(jsInitCheckTimer);

            const btn = document.createElement('button');
            btn.innerText=  'テーブルをコピー';

            const form = document.getElementsByClassName('flex-fill')[0];
            form.prepend(btn);

            btn.addEventListener('click', function(){
                const table  = document.getElementsByClassName('table-condensed')[0];
                const range = document.createRange();
                range.selectNode(table);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('copy');

                selection.removeRange(range);
            });
        }
    }
}
