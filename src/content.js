window.addEventListener('load', main, false);

function main(e) {
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
        if (document.getElementsByClassName('form-inline') != null) {
            clearInterval(jsInitCheckTimer);

            const btn = document.createElement('button');
            btn.innerText =  'テーブルをコピー';
            const mdBtn = document.createElement('button');
            mdBtn.innerText = 'マークダウン形式でコピー'

            const form = document.getElementsByClassName('flex-fill')[0];
            form.prepend(mdBtn);
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

            mdBtn.addEventListener('click', function(){
                const table  = document.getElementsByClassName('table-condensed')[0];
                const range = document.createRange();
                range.selectNode(table);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                const text = selection.toString();
                const mdText = text2md(text);
                navigator.clipboard.writeText(mdText)
                    .then(() => {
                        console.log("Text copied to clipboard...")
                    })
                    .catch(err => {
                        console.log('Something went wrong', err);
                    })

                selection.removeRange(range);
            });
        }
    }
}

function text2md(text) {
    let rows = text.split('\n');
    // 先頭行が空文字
    rows.shift();
    let headers = rows.shift().split('\t');
    // 最終項目が空文字
    headers.pop()

    // ヘッダー
    const headersText = `|${headers.join('|')}|`;
    const sepalatorText = `|${headers.map((_) => '---' ).join('|')}|`;

    // 行
    const columnNum = headers.length;
    let rowText;
    let count = 0;
    let rowTexts = [];
    rows.forEach(value => {
        if (count === 0) {
            rowText = '|';
        }
        rowText += value + '|';
        if (count === columnNum - 1) {
            rowTexts.push(rowText);
            count = 0;
            rowText = '';
        } else {
            count++;
        }
    });

    return [headersText, sepalatorText, ...rowTexts].join('\n');
}
