const loadAllProduts = async () => {
    const respons = await fetch("https://fakestoreapi.com/products");
    const data = await respons.json();
    return data;
};
// loadAllProduts();

const setAllMenu = async () => {
    const data = await loadAllProduts();
    const uniqeArry = [];
    
    const menu = document.getElementById("all-product");
    for(const product of data){
        
        if(uniqeArry.indexOf(product.category) === -1){
            uniqeArry.push(product.category);

            const li = document.createElement("li");
            li.innerHTML = `
            <a>${product.category}</a>
            `;
            menu.appendChild(li);
        }
    }
}

const searchField = document.getElementById("search-field");

searchField.addEventListener("keypress", async (event) => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");

    if( event.key === "Enter"){
        const searchFieldValue = searchField.value;
        const allProducts = await loadAllProduts();
        spinner.classList.add("hidden");
        
        const foundProduct = allProducts.filter(product => product.category.includes(searchFieldValue))
        console.log(foundProduct)
        
        const productContainer = document.getElementById("product-container");
        productContainer.textContent = " ";
        const notFound = document.getElementById("not-found")
        notFound.textContent = " ";

        if (foundProduct.length === 0){
            notFound.innerHTML = `
                <div class="alert alert-error shadow-lg w-1/2 justify-self-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! Not Found Product.</span>
                </div>
                </div>
            `;
            return;
        }

        foundProduct.forEach(product => {
            const {id, title, price, description, category, image, rating} = product;
            const {rate, count} = rating;

            const div = document.createElement("div");
            div.innerHTML = ` 
                <div class="card card-compact w-full bg-base-100 shadow-xl p-5">
                    <figure><img src="${image}" class=" h-80 w-full" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${category}</h2>
                    <p>${title.length > 20 ? title.slice(0, 40) + "..." : title}</p>
                    <kbd class="kbd">Price: ${price}$</kbd>
                    <label for="my-modal-3" onclick="showModal('${description}', '${image}', '${id}', '${rate}', '${count}')" class="btn">Show More Detaile</label>
                </div>
                </div>
            `;
            productContainer.appendChild(div);
        });
    }
})

const showModal = (description, img, id, rate, count) =>{
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML =`
        <img class=" "  src="${img}" alt="">
        <h2>ID: ${id}</h2>
        <h2>Rate: ${rate}</h2>
        <h2>Count: ${count}</h2>
        <p class="py-4">
        ${description}
        </p>
    `;
};

setAllMenu();