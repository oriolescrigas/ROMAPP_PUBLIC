import {useState, useEffect} from 'react';
import QRcode from 'qrcode.react';

const Order = (props) => {

    const [products, setProducts] = useState();
    const [qrcode, setQrcode] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await fetch(`${props.serverUrl}/get-products`)
            .then(res => res.json())
            .catch(error => console.error(error));
            setProducts(productsData);
        };
        fetchProducts();
    }, []);

    const ProductsDisplay = () => {

        const handleClick = () => {
            setQrcode(true);
        }

        return( products ?
            <div className="container bg-light">
                { products.map(product => (
                    <div className="product" key={product.id}>
                        <h2>{product.name}</h2>
                        <img src={product.images[0]} alt={product.name} className="my-image"/>
                    </div>

                ))}
                <button class="btn btn-dark" onClick={handleClick}>Order with QR code</button>
                
            </div> : <p className="loading-msg">Loading...</p>
        );
    }

    const QrcodeDisplay = () => {

        const qrCodeDestination = `${window.location.origin}/checkout`;

        return (
            <QRcode 
                value={qrCodeDestination}
                size={350}
                includeMargin={true}
            />
        );

    }

    return (qrcode ? <QrcodeDisplay /> : <ProductsDisplay />);
}

export default Order;