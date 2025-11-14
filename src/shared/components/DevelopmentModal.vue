<template>
  <SharedUiDialog v-model:open="isOpen">
    <SharedUiDialogTrigger as-child>
      <slot />
    </SharedUiDialogTrigger>
    <ClientOnly>
      <SharedUiDialogContent>
        <SharedUiDialogHeader>
          <div class="flex items-start gap-4">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <SharedUiDialogTitle>В разработке</SharedUiDialogTitle>
              <SharedUiDialogDescription class="mt-2">
                Эта функция находится в стадии разработки и будет доступна в ближайшее время.
                Спасибо за понимание!
              </SharedUiDialogDescription>
            </div>
          </div>
        </SharedUiDialogHeader>
        <SharedUiDialogFooter>
          <SharedUiDialogClose as-child>
            <SharedUiButton variant="default" class="w-full sm:w-auto"> Понятно </SharedUiButton>
          </SharedUiDialogClose>
        </SharedUiDialogFooter>
      </SharedUiDialogContent>
      <template #fallback>
        <!-- Пустой fallback для SSR -->
      </template>
    </ClientOnly>
  </SharedUiDialog>
</template>

<script setup lang="ts">
import {
  Dialog as SharedUiDialog,
  DialogTrigger as SharedUiDialogTrigger,
  DialogContent as SharedUiDialogContent,
  DialogHeader as SharedUiDialogHeader,
  DialogTitle as SharedUiDialogTitle,
  DialogDescription as SharedUiDialogDescription,
  DialogFooter as SharedUiDialogFooter,
  DialogClose as SharedUiDialogClose,
} from '@/shared/components/ui/dialog';
import SharedUiButton from '@/shared/components/ui/button/Button.vue';

const isOpen = ref(false);
</script>
