'use strict';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  const daudotrang = document.getElementById('daudotrang');
  const nutvedau = document.getElementById('nutvedau');
  const danhsachkhung = document.querySelectorAll('section[id]');
  const danhsachlienket = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    const vitricuon = window.scrollY;

    if (daudotrang) {
      daudotrang.classList.toggle('is-scrolled', vitricuon > 40);
    }

    if (nutvedau) {
      nutvedau.classList.toggle('is-visible', vitricuon > 400);
    }

    let mahientai = '';
    danhsachkhung.forEach(khung => {
      const dinhkhung = khung.offsetTop - 120;
      const chieucaokhung = khung.offsetHeight;
      if (vitricuon >= dinhkhung && vitricuon < dinhkhung + chieucaokhung) {
        mahientai = khung.getAttribute('id');
      }
    });

    danhsachlienket.forEach(lienket => {
      const duongdan = lienket.getAttribute('href');
      if (duongdan === `#${mahientai}`) {
        danhsachlienket.forEach(muc => muc.classList.remove('is-active'));
        lienket.classList.add('is-active');
      }
    });
  }, { passive: true });

  if (nutvedau) {
    nutvedau.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(theneo => {
    theneo.addEventListener('click', function (sukien) {
      const madich = this.getAttribute('href');
      if (!madich || madich === '#') return;

      const phantudich = document.querySelector(madich);
      if (phantudich) {
        sukien.preventDefault();
        const buchieucaodau = 76;
        const vitriphantu = phantudich.getBoundingClientRect().top;
        const vitribudich = vitriphantu + window.pageYOffset - buchieucaodau;

        window.scrollTo({
          top: vitribudich,
          behavior: 'smooth'
        });
      }
    });
  });

  const danhsachhienra = document.querySelectorAll('.reveal');

  if (danhsachhienra.length > 0 && 'IntersectionObserver' in window) {
    const quansathienra = new IntersectionObserver((danhsachmuc) => {
      danhsachmuc.forEach(muc => {
        muc.target.classList.toggle('is-revealed', muc.isIntersecting);
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    danhsachhienra.forEach(phantu => quansathienra.observe(phantu));
  } else {
    danhsachhienra.forEach(phantu => phantu.classList.add('is-revealed'));
  }

  const nutmenu = document.getElementById('nutmenu');
  const ngankeo = document.getElementById('ngankeo');

  if (nutmenu && ngankeo) {
    nutmenu.addEventListener('click', () => {
      ngankeo.classList.toggle('is-open');
    });

    const lienketngankeo = ngankeo.querySelectorAll('a, button');
    lienketngankeo.forEach(lienket => {
      lienket.addEventListener('click', () => {
        ngankeo.classList.remove('is-open');
      });
    });
  }

  const danhsachbodem = document.querySelectorAll('.counter');
  let dadem = false;

  const chaybodem = () => {
    danhsachbodem.forEach(bodem => {
      const muctieu = +bodem.getAttribute('data-target');
      const thoigianchay = 1800;
      const thoigiankhung = 1000 / 60;
      const tongkhung = Math.round(thoigianchay / thoigiankhung);
      let khung = 0;

      const giamtoc = thoigian => thoigian * (2 - thoigian);

      const bohen = setInterval(() => {
        khung++;
        const tiendo = giamtoc(khung / tongkhung);
        const giatrihientai = Math.round(muctieu * tiendo);

        if (muctieu >= 1000) {
          bodem.textContent = giatrihientai.toLocaleString('vi-VN');
        } else {
          bodem.textContent = giatrihientai;
        }

        if (khung === tongkhung) {
          clearInterval(bohen);
          if (muctieu >= 1000) {
            bodem.textContent = muctieu.toLocaleString('vi-VN');
          } else {
            bodem.textContent = muctieu;
          }
        }
      }, thoigiankhung);
    });
  };

  const khungthongke = document.querySelector('.stats-overlap');
  if (khungthongke && 'IntersectionObserver' in window) {
    const quansatthongke = new IntersectionObserver((danhsachmuc) => {
      danhsachmuc.forEach(muc => {
        if (muc.isIntersecting && !dadem) {
          dadem = true;
          chaybodem();
        } else if (!muc.isIntersecting) {
          dadem = false;
        }
      });
    }, { threshold: 0.2 });

    quansatthongke.observe(khungthongke);
  }

  const nutloc = document.querySelectorAll('.filter-pill');
  const thesanpham = document.querySelectorAll('.p-card');

  nutloc.forEach(nut => {
    nut.addEventListener('click', () => {
      nutloc.forEach(muc => muc.classList.remove('is-active'));
      nut.classList.add('is-active');

      const boloc = nut.getAttribute('data-filter');

      let hienthi = 0;
      thesanpham.forEach(the => {
        const danhmuc = the.getAttribute('data-category');
        if (boloc === 'all' || danhmuc === boloc) {
          the.style.display = 'flex';
          hienthi++;
          setTimeout(() => {
            the.style.opacity = '1';
            the.style.transform = 'translateY(0)';
          }, 50);
        } else {
          the.style.opacity = '0';
          the.style.transform = 'translateY(15px)';
          setTimeout(() => {
            the.style.display = 'none';
          }, 250);
        }
      });

      const phantusoluong = document.getElementById('soluonghienthi');
      if (phantusoluong) phantusoluong.textContent = hienthi;
    });
  });

  const hopthoaitai = document.getElementById('hopthoaitai');
  const danhsachnuttai = [
    document.getElementById('nuttai'),
    document.getElementById('nuttaididong'),
    document.getElementById('nuttaibanner')
  ];
  const nutdonghopthoai = document.getElementById('nutdonghopthoai');
  const bieumautai = document.getElementById('bieumautai');

  const mohopthoai = () => {
    if (hopthoaitai) {
      hopthoaitai.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  };

  const donghopthoai = () => {
    if (hopthoaitai) {
      hopthoaitai.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  };

  danhsachnuttai.forEach(nut => {
    if (nut) nut.addEventListener('click', mohopthoai);
  });

  if (nutdonghopthoai) nutdonghopthoai.addEventListener('click', donghopthoai);

  if (hopthoaitai) {
    hopthoaitai.addEventListener('click', (sukien) => {
      if (sukien.target === hopthoaitai) donghopthoai();
    });
  }

  document.addEventListener('keydown', (sukien) => {
    if (sukien.key === 'Escape') donghopthoai();
  });

  if (bieumautai) {
    bieumautai.addEventListener('submit', (sukien) => {
      sukien.preventDefault();
      const ten = document.getElementById('otentai').value.trim();
      donghopthoai();
      bieumautai.reset();
      hienthithongbao(`Cảm ơn ${ten}! Link tải Catalogue 2026 đã được gửi đến bạn.`);
    });
  }

  const bieumautuvan = document.getElementById('bieumautuvan');
  if (bieumautuvan) {
    bieumautuvan.addEventListener('submit', (sukien) => {
      sukien.preventDefault();
      const ten = document.getElementById('oten').value.trim();
      bieumautuvan.reset();
      hienthithongbao(`Cảm ơn ${ten}! Chuyên viên Thăng Long sẽ gọi điện tư vấn trong vòng 15 phút.`);
    });
  }

  function hienthithongbao(noidung) {
    const thongbaocu = document.querySelector('.toast-msg');
    if (thongbaocu) thongbaocu.remove();

    const thongbao = document.createElement('div');
    thongbao.className = 'toast-msg';
    thongbao.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 8px;"></i> ${noidung}`;
    document.body.appendChild(thongbao);

    requestAnimationFrame(() => {
      thongbao.classList.add('is-show');
    });

    setTimeout(() => {
      thongbao.classList.remove('is-show');
      setTimeout(() => thongbao.remove(), 400);
    }, 4000);
  }

  const thedanhgia = document.querySelectorAll('.testimonial-card');
  const chamdanhgia = document.querySelectorAll('.t-dot');
  const nuttruoc = document.getElementById('nuttruoc');
  const nutsau = document.getElementById('nutsau');
  let chisohientai = 0;

  function hienthidanhgia(chiso) {
    if (!thedanhgia.length) return;
    if (chiso < 0) chiso = thedanhgia.length - 1;
    if (chiso >= thedanhgia.length) chiso = 0;
    chisohientai = chiso;

    thedanhgia.forEach((the, vitri) => {
      the.classList.toggle('is-active', vitri === chisohientai);
    });

    chamdanhgia.forEach((cham, vitri) => {
      cham.classList.toggle('is-active', vitri === chisohientai);
    });
  }

  if (nuttruoc) {
    nuttruoc.addEventListener('click', () => hienthidanhgia(chisohientai - 1));
  }
  if (nutsau) {
    nutsau.addEventListener('click', () => hienthidanhgia(chisohientai + 1));
  }

  chamdanhgia.forEach(cham => {
    cham.addEventListener('click', () => {
      const chiso = +cham.getAttribute('data-index');
      hienthidanhgia(chiso);
    });
  });

  if (thedanhgia.length > 0) {
    setInterval(() => {
      hienthidanhgia(chisohientai + 1);
    }, 8000);
  }

  window.mohopthoaisanpham = function(masanpham) {
    mohopthoai();
    hienthithongbao(`Đang mở tài liệu kỹ thuật cho mã: ${masanpham}`);
  };

});