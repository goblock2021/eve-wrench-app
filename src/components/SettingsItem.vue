<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    User,
    Rocket,
    MoreHorizontal,
    ArrowUpFromLine,
    ArrowDownToLine,
    Save,
    RotateCcw,
} from 'lucide-vue-next'
import type { SettingsEntry, SettingsKind, BackupEntry } from '@/types'

const props = defineProps<{
    entry: SettingsEntry
    isSource: boolean
    isTarget: boolean
    sourceKind: SettingsKind | null
    backups: BackupEntry[]
}>()

const emit = defineEmits<{
    setSource: [entry: SettingsEntry]
    addTarget: [entry: SettingsEntry]
    backup: [entry: SettingsEntry]
    restore: [entry: SettingsEntry, backup: BackupEntry]
}>()

const isCharacter = props.entry.kind === 'char'
</script>

<template>
    <TableRow
        :class="{
            'bg-primary/20': isSource,
            'bg-muted': isTarget && !isSource,
        }"
    >
        <TableCell class="w-8">
            <div
                class="flex size-6 items-center justify-center overflow-hidden rounded"
            >
                <img
                    v-if="isCharacter && entry.character"
                    :src="entry.character.portrait_url"
                    class="size-full object-cover"
                    @error="
                        ($event.target as HTMLImageElement).style.display =
                            'none'
                    "
                />
                <Rocket
                    v-else-if="isCharacter"
                    class="size-4 text-muted-foreground"
                />
                <User v-else class="size-4 text-muted-foreground" />
            </div>
        </TableCell>
        <TableCell>{{ entry.character?.name || entry.id }}</TableCell>
        <TableCell class="text-muted-foreground">{{
            entry.relative_time
        }}</TableCell>
        <TableCell class="w-24 text-right">
            <div class="flex justify-end gap-1">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="size-7"
                            :disabled="isSource"
                            @click="emit('setSource', entry)"
                        >
                            <ArrowUpFromLine class="size-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Source</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="size-7"
                            :disabled="!sourceKind || sourceKind !== entry.kind"
                            @click="emit('addTarget', entry)"
                        >
                            <ArrowDownToLine class="size-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Target</TooltipContent>
                </Tooltip>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="icon" class="size-7">
                            <MoreHorizontal class="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem @select="emit('backup', entry)">
                            <Save class="mr-2 size-4" />
                            Create backup
                        </DropdownMenuItem>
                        <DropdownMenuSub v-if="backups.length">
                            <DropdownMenuSubTrigger>
                                <RotateCcw class="mr-2 size-4" />
                                Restore from backup
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    v-for="backup in backups"
                                    :key="backup.id"
                                    @select="emit('restore', entry, backup)"
                                >
                                    {{ backup.name }}
                                    <span
                                        class="ml-2 text-xs text-muted-foreground"
                                        >{{ backup.relative_time }}</span
                                    >
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem v-else disabled>
                            <RotateCcw class="mr-2 size-4" />
                            No backups available
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TableCell>
    </TableRow>
</template>
