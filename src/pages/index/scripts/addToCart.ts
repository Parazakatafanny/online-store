import { calculateCart } from "./calculateCart";


export function addToCart(): void {
  const cartBtn = document.querySelectorAll<HTMLDivElement>('.price__icon')!;

  cartBtn.forEach(element => {
    element.addEventListener('click', toCart);
  });

  function toCart(this: HTMLDivElement): void {
    const img: HTMLSpanElement = this.querySelector('.cart')!;

    const id: string = this.id.split('_')[this.id.split('_').length - 1];
    if (localStorage.getItem('onlineStoreCartIDs')) {
      let ids: string[] = localStorage.getItem('onlineStoreCartIDs')!.split(',');
      let count: string[] = localStorage.getItem('onlineStoreCartCount')!.split(',');
      if (ids.includes(id)) {
        count.splice(ids.indexOf(id), 1);
        ids.splice(ids.indexOf(id), 1);
        localStorage.setItem('onlineStoreCartIDs', ids.join(','));
        localStorage.setItem('onlineStoreCartCount', count.join(','));
        img.classList.remove('trash');
      } else {
        localStorage.setItem('onlineStoreCartIDs', localStorage.getItem('onlineStoreCartIDs') + ',' + id);
        localStorage.setItem('onlineStoreCartCount', localStorage.getItem('onlineStoreCartCount') + ',' + 1);
        img.classList.add('trash');
      }
    } else {
      localStorage.setItem('onlineStoreCartIDs', id);
      localStorage.setItem('onlineStoreCartCount', '1');
      img.classList.add('trash');
    }
    calculateCart();
  }
}

export function checkInCart(id: number) {
  const ids: string = localStorage.getItem('onlineStoreCartIDs')!;
  if (ids === null) {
    return false;
  }
  const idsArr: String[] = ids.split(',');
  calculateCart();
  return idsArr.includes(id.toString());
}