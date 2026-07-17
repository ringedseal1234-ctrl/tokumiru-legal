---
title: トクミル
description: バーコードや商品画像から、日用品・加工食品の価格を見比べる価格比較アプリ「トクミル」
permalink: /
body_class: home
---

<section class="hero">
  <div class="hero__inner content-shell">
    <div class="hero__copy">
      <p class="eyebrow">日用品・加工食品の価格比較</p>
      <h1>トクミル</h1>
      <p class="hero__tagline">その値段、買う前に見比べる。</p>
      <p class="hero__description">
        バーコードと値札を読み取って、EC価格と店頭価格をひとつの画面で比較。
        いつもの買い物を、迷いにくく、振り返りやすくします。
      </p>
      <div class="hero__actions">
        <a class="button" href="#how-it-works">使い方を見る</a>
        <a class="button button--secondary" href="{{ "/features.html" | relative_url }}">できること</a>
      </div>
      <p class="release-status">Android版・iOS版を公開準備中</p>
    </div>

    <div class="scan-scene" role="img" aria-label="バーコードを読み取り、店頭価格とEC価格を比較するイメージ">
      <div class="scan-scene__viewport" aria-hidden="true">
        <div class="scan-scene__beam"></div>
        <div class="barcode">
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p class="scan-scene__label">バーコードを枠内に合わせる</p>
      </div>
      <div class="price-signal price-signal--store" aria-hidden="true">
        <span class="price-signal__site">店頭価格</span>
        <span class="price-signal__value">¥398</span>
      </div>
      <div class="price-signal price-signal--ec" aria-hidden="true">
        <span class="price-signal__site">EC価格</span>
        <span class="price-signal__value">¥420〜</span>
      </div>
    </div>
  </div>
</section>

<section class="section section--surface" id="how-it-works">
  <div class="content-shell">
    <header class="section-heading reveal">
      <p class="eyebrow">How it works</p>
      <h2>比べるまで、3ステップ。</h2>
      <p>商品の特定から価格の比較まで、買い物中でも迷わない流れを目指しています。</p>
    </header>
    <div class="steps">
      <article class="step reveal">
        <span class="step__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3M4 12h16"/></svg>
        </span>
        <h3>商品を読み取る</h3>
        <p>まずはバーコードをスキャン。値札も読み取れば、店頭価格を比較へ加えられます。バーコードが使えない商品は、パッケージ画像から候補を探せます。</p>
      </article>
      <article class="step reveal">
        <span class="step__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v11a3 3 0 0 0 6 0V3M4 6h6M14 6h6M7 3v3M17 3v3M17 14l3 3-3 3M17 17H10"/></svg>
        </span>
        <h3>価格を見比べる</h3>
        <p>楽天市場、Yahoo!ショッピングなどのEC価格を取得。送料、内容量、個数を見ながら単価でも比較できます。</p>
      </article>
      <article class="step reveal">
        <span class="step__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M9 13l2 2 4-4"/></svg>
        </span>
        <h3>買い物を記録する</h3>
        <p>購入を記録すると、節約レポートと買い時ノートに反映。次の買い物に活かせます。</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="content-shell">
    <header class="section-heading reveal">
      <p class="eyebrow">Compare clearly</p>
      <h2>安さだけでなく、買い方まで見える。</h2>
      <p>価格、送料、内容量、個数、店頭価格を並べ、選ぶために必要な情報へすぐ届く構成です。</p>
    </header>

    <div class="feature-row reveal">
      <div class="feature-row__copy">
        <h3>ECと店頭を、同じ目線で。</h3>
        <p>
          ECサイトの検索結果だけでなく、目の前の棚札価格も比較対象に。
          送料や個数を加味した単価、取得時点、条件が分かる表示を重視しています。
        </p>
      </div>
      <div class="feature-visual" role="img" aria-label="価格比較の表示例">
        <div class="compare-list">
          <div class="compare-item compare-item--best">
            <div>
              <div class="compare-item__site">店頭</div>
              <div class="compare-item__meta">いま見ているお店</div>
            </div>
            <div class="compare-item__price">¥398</div>
          </div>
          <div class="compare-item">
            <div>
              <div class="compare-item__site">Yahoo!ショッピング</div>
              <div class="compare-item__meta">送料条件は商品ページで確認</div>
            </div>
            <div class="compare-item__price">¥420</div>
          </div>
          <div class="compare-item">
            <div>
              <div class="compare-item__site">楽天市場</div>
              <div class="compare-item__meta">送料無料</div>
            </div>
            <div class="compare-item__price">¥448</div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-row feature-row--reverse reveal">
      <div class="feature-row__copy">
        <h3>節約と買い時を、あとから実感。</h3>
        <p>
          購入時に記録した節約額を月・年ごとに集計。購入履歴から自分の底値を振り返り、
          EC相場のデータが集まった商品は買い時の目安も確認できます。
        </p>
      </div>
      <div class="feature-visual savings-visual" role="img" aria-label="日ごとの節約額を表す棒グラフのイメージ">
        <div class="savings-visual__bar" style="height: 28%"></div>
        <div class="savings-visual__bar"></div>
        <div class="savings-visual__bar"></div>
        <div class="savings-visual__bar"></div>
        <div class="savings-visual__bar"></div>
        <div class="savings-visual__bar"></div>
        <div class="savings-visual__bar"></div>
      </div>
    </div>
  </div>
</section>

<section class="section map-feature">
  <div class="content-shell">
    <div class="feature-row reveal">
      <div class="feature-row__copy">
        <p class="eyebrow">Lowest price map</p>
        <h3>近くの最安値を、地図でひと目に。</h3>
        <p>
          最安値MAPなら、値札スキャンをきっかけに記録された周辺店舗の価格情報を地図上で確認できます。
          行く前に価格の目安を把握して、寄り道するお店を選べます。
        </p>
        <p class="feature-row__note">ベータ版の機能です。位置情報の利用は任意で、価格情報は蓄積状況により地域によって表示されない場合があります。</p>
      </div>
      <div class="map-preview" role="img" aria-label="周辺店舗の価格情報と最安値を地図で表示するイメージ">
        <div class="map-preview__roads" aria-hidden="true"></div>
        <div class="map-preview__area map-preview__area--one" aria-hidden="true"></div>
        <div class="map-preview__area map-preview__area--two" aria-hidden="true"></div>
        <div class="map-pin map-pin--best"><span>最安</span><strong>¥398</strong></div>
        <div class="map-pin map-pin--near"><span>スーパー</span><strong>¥428</strong></div>
        <div class="map-pin map-pin--third"><span>ドラッグストア</span><strong>¥418</strong></div>
        <div class="map-preview__you">現在地</div>
        <div class="map-preview__legend"><span></span>投稿された価格情報</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--surface">
  <div class="content-shell">
    <header class="section-heading reveal">
      <p class="eyebrow">Privacy by design</p>
      <h2>必要な情報だけを、必要なときに。</h2>
      <p>カメラや位置情報を使うアプリだからこそ、取得範囲と利用目的を明確にします。</p>
    </header>
    <div class="trust-grid reveal">
      <article class="trust-item">
        <span class="trust-item__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
        </span>
        <h3>位置情報は任意</h3>
        <p>近隣店舗の候補や地域価格を使う場合だけ許可を求めます。生の現在地は永続保存しません。</p>
      </article>
      <article class="trust-item">
        <span class="trust-item__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="3.2"/><path d="M8 6l1.4-2h5.2L16 6"/></svg>
        </span>
        <h3>画像利用を限定</h3>
        <p>バーコードと文字認識は端末上で処理。クラウド認識を選んだ場合だけ、対象画像を解析へ送信します。</p>
      </article>
      <article class="trust-item">
        <span class="trust-item__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M10 11v6M14 11v6"/></svg>
        </span>
        <h3>いつでも削除</h3>
        <p>設定画面からアカウントと関連データの削除を開始できます。匿名の利用統計も設定で停止できます。</p>
      </article>
    </div>
  </div>
</section>

<section class="section section--accent">
  <div class="content-shell cta-band reveal">
    <div>
      <h2>公開に向けて準備中。</h2>
      <p>ストア公開後、このサイトで正式なダウンロード先を案内します。</p>
    </div>
    <a class="button button--light" href="{{ "/support.html" | relative_url }}">サポート情報</a>
  </div>
</section>
