// 产品官网页面脚本（中文注释）
// - 复用 theme-manager.js 进行主题切换
// - 处理滚动、外链与占位下载链接

(function () {
  'use strict';

  /**
   * 平滑滚动到锚点
   */
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (href.length > 1) {
          e.preventDefault();
          const id = href.slice(1);
          const target = document.getElementById(id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /**
   * 外部链接打开新窗口
   */
  function setupExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
    links.forEach((a) => {
      a.setAttribute('rel', 'noopener');
      a.setAttribute('target', '_blank');
    });
  }

  // 下载按钮逻辑已移除

  /**
   * 初始化
   */
  function init() {
    setupSmoothScroll();
    setupExternalLinks();
    setupHeaderScrollEffect();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/**
 * 头部滚动效果：下滑时添加阴影与更高容器色
 */
function setupHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


