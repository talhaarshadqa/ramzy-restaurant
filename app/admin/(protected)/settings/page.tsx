import {SettingsForm} from '@/components/admin/SettingsForm';
import {getSiteSettings} from '@/lib/data/settings';

export default async function AdminSettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div>
            <h1 className="mb-2 font-display text-3xl font-bold text-ink">Settings</h1>
            <p className="mb-8 max-w-lg text-sm text-ink-soft">
                Note: your printed menu says &quot;11am – 6pm&quot;, but Google previously showed &quot;Closes 7pm&quot; for the same day — worth double-checking the real hours and updating
                below.
            </p>
            <SettingsForm settings={settings} />
        </div>
    );
}
