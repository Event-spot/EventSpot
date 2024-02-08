
export function PaginationItems(
    currentPage: number,
    lastPage: number,
    maxLength: number
){
    const page: Array<number> = [];
    
    if (lastPage <= maxLength) {
        for (let i = 1; i <= lastPage; i++) {
          page.push(i);
        }
      }
    
    else {
        const firstPage = 1;
        const confirmedPagesCount = 3;
        const deductedMaxLength = maxLength - confirmedPagesCount;
        const sideLength = deductedMaxLength / 2;

        if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
            for (let j = 1; j <= sideLength + firstPage; j++) {
                page.push(j);
            }

            page.push(NaN);

            for (let k = lastPage - sideLength; k <= lastPage; k++) {
                page.push(k);
            }
        }
        else if ( currentPage - firstPage >= deductedMaxLength && lastPage - currentPage >= deductedMaxLength) {
            const deductedSideLength = sideLength - 1;
            
            page.push(1);
            page.push(NaN);

            for (let l = currentPage - deductedSideLength; l <= currentPage + deductedSideLength; l++) {
                page.push(l);
            }
            page.push(NaN);
            page.push(lastPage);
        }
        else {
            const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
            let remainingLength = maxLength;
      
            if (isNearFirstPage) {
              for (let m = 1; m <= currentPage + 1; m++) {
                page.push(m);
                remainingLength -= 1;
              }
              page.push(NaN);
              remainingLength -= 1;

              for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
              page.push(n);
              }

            } else {
              for (let o = lastPage; o >= currentPage - 1; o--) {
                page.unshift(o);
                remainingLength -= 1;
              }
      
              page.unshift(NaN);
              remainingLength -= 1;

              for (let p = remainingLength; p >= 1; p--) {
                page.unshift(p);
              }
            }
          }
    }

    return page;
}


