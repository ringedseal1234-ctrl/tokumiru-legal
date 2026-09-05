---
layout: page
title: トクミルをダウンロード
eyebrow: Download
lead: お使いの端末のストアへご案内します。
description: トクミルを App Store / Google Play からダウンロード
permalink: /dl.html
sitemap: false
---

{%- assign ios_url = "" -%}
{%- if site.app_store_id and site.app_store_id != "" -%}
  {%- assign ios_url = "https://apps.apple.com/jp/app/id" | append: site.app_store_id -%}
{%- endif -%}
{%- assign android_url = "" -%}
{%- if site.play_live -%}
  {%- assign android_url = "https://play.google.com/store/apps/details?id=" | append: site.play_package -%}
{%- endif -%}

<script>
  // 端末に合ったストアへ自動で送る。公開前のストアURLは404になるため、
  // _config.yml で「配信中」と分かっているストアだけを対象にする。
  // ?stay=1 を付けると自動遷移せずこのページを表示する（動作確認用）。
  (function () {
    var iosUrl = {{ ios_url | jsonify }};
    var androidUrl = {{ android_url | jsonify }};
    if (location.search.indexOf('stay=1') !== -1) return;
    var ua = navigator.userAgent || '';
    var isIos = /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) && typeof document.ontouchend !== 'undefined');
    var target = isIos ? iosUrl : (/Android/.test(ua) ? androidUrl : '');
    if (target) location.replace(target);
  })();
</script>

{% if ios_url != "" or android_url != "" %}
<div class="support-shortcuts" aria-label="ストアを選ぶ">
  {% if ios_url != "" %}<a class="support-shortcut" href="{{ ios_url }}"><span class="support-shortcut__index">iOS</span><strong>App Store</strong><span>iPhone / iPad</span><b aria-hidden="true">↗</b></a>{% endif %}
  {% if android_url != "" %}<a class="support-shortcut" href="{{ android_url }}"><span class="support-shortcut__index">And</span><strong>Google Play</strong><span>Android スマートフォン</span><b aria-hidden="true">↗</b></a>{% endif %}
</div>

<p class="info-note">自動で移動しない場合は、上のボタンからストアを開いてください。</p>
{% else %}
<p class="status-note"><span class="release-status__dot" aria-hidden="true"></span> トクミルは現在ストアへの公開準備中です。公開後、このページから App Store と Google Play へご案内します。</p>
{% endif %}

<h2>トクミルでできること</h2>

<ul>
  <li>商品と値札を撮るだけで、店頭価格とネット価格をその場で比較できます。</li>
  <li>買った記録から節約額が積み上がり、月ごと・年ごとに振り返れます。</li>
  <li>マイリストに入れた商品が目標価格まで下がったら通知が届きます。</li>
</ul>

<p><a class="text-link" href="{{ "/features.html" | relative_url }}">機能の詳細を見る</a> ／ <a class="text-link" href="{{ "/support.html" | relative_url }}">サポート</a></p>
