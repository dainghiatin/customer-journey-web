import { useTranslation } from 'react-i18next';
import useMetric from "../custom-hooks/useMetric";

const DataTableComponent = () => {
    const { t } = useTranslation();
    const metric = useMetric();

    return (
        <div className="overflow-x-auto w-full">
            <table className="text-sm text-left h-full w-full">
                <tbody style={{ fontSize: "clamp(6px, 0.75vw, 14px)" }}>
                    {/* Row 1 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">
                            <span>{t('metrics.listedValue', 'GIÁ TRỊ LÊN SÀN:')}:</span>
                        </td>
                        <td className="px-1 border border-black h-5"><strong>{metric.listedValue}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.transactions', 'LƯỢT GIAO DỊCH')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.transactions}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.accesses', 'LƯỢT TRUY CẬP')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.accesses}</strong></td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.successfully', 'THÀNH CÔNG')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.successfully}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.amount', 'SỐ TIỀN')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.amount}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.duration', 'THỜI LƯỢNG')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.duration}</strong></td>
                    </tr>

                    {/* Row 3 - Single Row */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold text-center h-5" colSpan={2}>{t('metrics.bankUpdate', 'NGÂN HÀNG CẬP NHẬT')}:</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.deposited', 'ĐÃ GỬI')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.deposited}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.videoViews', 'LƯỢT XEM VIDEO')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.videoViews}</strong></td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withTerm', 'CÓ KỲ HẠN')}</td>
                        <td className="px-1 border border-black h-5">{t('metrics.update', 'CẬP NHẬT')}</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withdrawn', 'ĐÃ RÚT')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.withdrawn}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.members', 'THÀNH VIÊN')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.members}</strong></td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="border border-black">
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.withoutTerm', 'KHÔNG KỲ HẠN')}</td>
                        <td className="px-1 border border-black h-5">{t('metrics.update', 'CẬP NHẬT')}</td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.remaining', 'CÒN LẠI')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.remaining}</strong></td>
                        <td className="px-1 border border-black font-bold h-5">{t('metrics.online', 'TRUY CẬP')}:</td>
                        <td className="px-1 border border-black h-5"><strong>{metric.online}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DataTableComponent;