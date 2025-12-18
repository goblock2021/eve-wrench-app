<script setup lang="ts">
import ProfileCard from './ProfileCard.vue'
import type {
    ServerData,
    ProfileData,
    SettingsEntry,
    SettingsKind,
    BackupEntry,
} from '@/types'

defineProps<{
    server: ServerData
    sourceKind: SettingsKind | null
    isSource: (entry: SettingsEntry) => boolean
    isTarget: (entry: SettingsEntry) => boolean
    allBackups: BackupEntry[]
}>()

const emit = defineEmits<{
    setSource: [entry: SettingsEntry]
    addTarget: [entry: SettingsEntry]
    backup: [entry: SettingsEntry]
    restore: [entry: SettingsEntry, backup: BackupEntry]
    addAllFromProfile: [profile: ProfileData, kind: SettingsKind]
    refresh: []
}>()
</script>

<template>
    <div>
        <ProfileCard
            v-for="profile in server.profiles"
            :key="profile.path"
            :profile="profile"
            :source-kind="sourceKind"
            :is-source="isSource"
            :is-target="isTarget"
            :all-backups="allBackups"
            @set-source="emit('setSource', $event)"
            @add-target="emit('addTarget', $event)"
            @backup="emit('backup', $event)"
            @restore="(entry, backup) => emit('restore', entry, backup)"
            @add-all-from-profile="(p, k) => emit('addAllFromProfile', p, k)"
            @refresh="emit('refresh')"
        />
    </div>
</template>
