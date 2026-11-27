import {
    Component,
    xml,
    useState,
    useRef,
    onWillStart,
    onWillRender,
    onRendered,
    onMounted,
    onWillPatch,
    onPatched,
} from "@odoo/owl";

export class MyComponent extends Component {
    static template = xml`
        <div>
            <h3>Produk</h3>
            <ul>
                <li t-foreach="state.products" t-as="product" t-key="product.id">
                    <t t-esc="product.name"/>
                    -
                    <t t-esc="product.price.toLocaleString('id-ID')"/>
                </li>
            </ul>
            <p t-ref="info">Jumlah: <t t-esc="state.count"/></p>
            <button class="btn btn--primary" t-on-click="increment">
                Tambah
            </button>
        </div>
    `;

    setup() {
        this.state = useState({ count: 0, products: [] });
        this.infoRef = useRef("info");

        let startTime = 0;
        let renderCount = 0;

        onWillStart(async () => {
            console.log("[willStart] memuat data...");
            this.state.products = await this.loadData();
        });

        onWillRender(() => {
            console.log("[willRender] total produk:", this.state.products.length);
            startTime = performance.now();
        });

        onRendered(() => {
            renderCount++;
            const ms = (performance.now() - startTime).toFixed(2);
            console.log(`[rendered] render ke-${renderCount} selesai dalam ${ms} ms`);
            console.log("[rendered] isi DOM saat ini (masih lama):", this.infoRef.el?.textContent);
        });

        onMounted(() => {
            console.log("[mounted] DOM:", this.infoRef.el.textContent);
        });

        onWillPatch(() => {
            console.log("[willPatch] DOM sebelum:", this.infoRef.el.textContent);
        });

        onPatched(() => {
            console.log("[patched] DOM sesudah:", this.infoRef.el.textContent);
        });
    }

    async loadData() {
        return [
            { id: 1, name: "Laptop", price: 10000000 },
            { id: 2, name: "Keyboard", price: 500000 },
            { id: 3, name: "Mouse", price: 200000 },
        ];
    }

    increment() {
        this.state.count++;
    }
}