import"./modulepreload-polyfill-B5Qt9EMX.js";const i="https://safe-browse-proxy.joipotupoi.workers.dev/",e=document.getElementById("status"),r=document.querySelector(".container");function c(){const o=new URLSearchParams(window.location.search).get("q");if(!o)return null;try{return decodeURIComponent(o)}catch(n){return console.error("絵文字URLのデコード中にエラーが発生しました:",n),e&&(e.textContent="エラー: 絵文字URLのデコードに失敗しました。"),null}}async function d(){const t=c();if(!t){e&&(e.textContent="エラー: デコード可能なURLが見つかりません。");return}e&&(e.textContent=`URL (${t}) の安全性を確認中...`);const o=`
        <div id="dangerWarning" class="warning" style="color: red; font-weight: bold; margin-top: 20px;">
            <p>⚠️ <strong>警告: このURLは危険である可能性があります！</strong></p>
            <p>フィッシングやマルウェアの危険があるため、リダイレクトを停止しました。</p>
            <p>元のURL: <span id="unsafeUrl" style="word-break: break-all;"></span></p>
        </div>
    `;try{const n=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:t})});if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const a=await n.json();if(a.isSafe)e&&(e.textContent=`URL (${t}) は安全です。リダイレクト中...`),window.location.href=t;else{if(e&&(e.style.display="none"),r){r.insertAdjacentHTML("beforeend",o);const s=document.getElementById("unsafeUrl");s&&(s.textContent=t)}console.warn("危険なURLが検出されました:",t,a.matches)}}catch(n){console.error("Safe Browseチェック中にエラーが発生しました:",n),e&&(e.textContent="エラー: 安全性確認中に問題が発生しました。"),r&&r.insertAdjacentHTML("beforeend",`
                <div style="color: orange; margin-top: 20px;">
                    <p>エラーにより安全性の確認ができませんでした。</p>
                    <p>元のURL: <span style="word-break: break-all;">${t}</span></p>
                    <p>問題が解決しない場合は、ページを再読み込みしてください。</p>
                </div>
            `)}}document.addEventListener("DOMContentLoaded",()=>{d()});
