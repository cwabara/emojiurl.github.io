import{d as i}from"./encoderDecoder-DDaLqDSk.js";const c="https://safe-browse-proxy.joipotupoi.workers.dev/",e=document.querySelector(".container"),l=`
    <h1>URL確認中...</h1>
    <p id="status">安全性を確認しています。しばらくお待ちください。</p>
`,p=`
    <h1>リダイレクト中...</h1>
    <p>URLは安全と確認されました。</p>
    <p id="status">元のURLへリダイレクトしています。</p>
`;function d(){const t=new URLSearchParams(window.location.search).get("q");if(!t)return e&&(e.innerHTML=`
                <h1>エラー</h1>
                <p>URLクエリパラメータ 'q' が見つかりません。</p>
                <p>正しい絵文字URL形式でアクセスしてください。</p>
            `),null;try{const r=i(t);if(!r)throw new Error("絵文字URLのデコード結果が空です。無効な絵文字URL形式かもしれません。");return r}catch(r){return console.error("絵文字URLのデコード中にエラーが発生しました:",r),e&&(e.innerHTML=`
                <h1>エラー</h1>
                <p>絵文字URLのデコードに失敗しました。無効な形式のURLです。</p>
                <p style="word-break: break-all;">入力された絵文字URL: ${t}</p>
                <p>正しい絵文字URL形式でアクセスしているか確認してください。</p>
            `),null}}async function L(){e&&(e.innerHTML=l);const o=document.getElementById("status"),t=d();if(!t)return;o&&(o.textContent=`URL (${t}) の安全性を確認中...`);const r=`
        <div id="dangerWarning" class="warning" style="color: red; font-weight: bold; margin-top: 20px;">
            <p>⚠️ <strong>警告: このURLは危険である可能性があります！</strong></p>
            <p>フィッシングやマルウェアの危険があるため、リダイレクトを停止しました。</p>
            <p>元のURL: <span id="unsafeUrl" style="word-break: break-all;"></span></p>
        </div>
    `;try{const n=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})});if(!n.ok){const s=await n.text();throw new Error(`プロキシサーバーからのHTTPエラー: ${n.status} - ${s}`)}const a=await n.json();if(a.isSafe)e&&(e.innerHTML=p),o&&(o.textContent=`URL (${t}) は安全です。リダイレクト中...`),window.location.href=t;else{if(e){e.innerHTML="",e.insertAdjacentHTML("beforeend",r);const s=document.getElementById("unsafeUrl");s&&(s.textContent=t)}console.warn("危険なURLが検出されました:",t,a.matches)}}catch(n){console.error("Safe Browseチェック中にエラーが発生しました:",n),e&&(e.innerHTML="",e.insertAdjacentHTML("beforeend",`
                <div style="color: orange; margin-top: 20px;">
                    <h1>エラーが発生しました</h1>
                    <p>安全性の確認中に問題が発生しました。</p>
                    <p>元のURL: <span style="word-break: break-all;">${t||"URLのデコードに失敗"}</span></p>
                    <p>詳細: ${n.message||String(n)}</p>
                    <p>問題が解決しない場合は、ページを再読み込みするか、管理者にお問い合わせください。</p>
                </div>
            `))}}document.addEventListener("DOMContentLoaded",()=>{L()});
